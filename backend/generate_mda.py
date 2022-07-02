import PyPDF2 # For numPages
import pdfplumber
from datetime import date
import requests


def read_pdf(pdf_file):
    pdf = pdfplumber.open(pdf_file)
    reader = PyPDF2.PdfFileReader(pdf_file)
    return pdf, reader


# Return the change in percentage %
def calculateChange(oldVal, newVal):
    return (newVal - oldVal) / oldVal * 100


# Return float

def becomeNumber(string):   
    thingsToReplace = [',', '(', ')', ' ']
    
    for i in thingsToReplace:
        string = string.replace(i, '')
        
    try:
        return float(string)
    
    except:
        return 0


# Iterating all pages of PDF to find keyWord
def find_keywork_in_pdf(usrKeyword, pdf, reader):

    title = reader.getDocumentInfo().title

    # Declaring the dictionary to be returned
    dictToRT = {
        "mdna": {
            title: []
        },
        "isComplete": False,
        "isError": False
    }   

    # Splitting the usrKeyword into different keywords by ',' comma
    usrKeyword = usrKeyword.split(',')
    for i in range(len(usrKeyword)):
        usrKeyword[i] = usrKeyword[i].strip()

    found = 0     # If found = 1, means found the keyWord in PDF, if found = 0, means cannot find keyWord in PDF, need key in a new keyWord again
    unitMultiply = 0
    possibleYears = range(1900, date.today().year + 1)
    # The months are  in small letters so it's not caps-sensitive
    possibleMonths = ["december", "november", "october", "september", "august", "july", "june", "may", "april", "march", "february", "january"]
    possibleUnits = ["$'0", "$'00","$'000", "$'0000", "$'00000", "$'000000", "$'0000000", "$’000", "’000", "millions", "thousands", "hundreds", "million", "thousand", "hundred", "millions,", "thousands,", "hundreds,", "million,", "thousand,", "hundred,"]
    # Excluded '-' and ',' as rowName might possibly have them in its name
    specialCharacters = ['`', '~', '!', '@', '#', '$', '%', '^', '&', '*', '(',')', '+', '[', ']', '{', '}', '\\', ':', ';', "'", '"', '|', '<', '.', '>', '/', '?', '£', '€', '¢']

    try:
        # Iterating all the possible keyWords in usrKeyword
        for keyWord in usrKeyword:

            # Iterating all pages of PDF to find keyWord
            for x in range(reader.numPages):
                pageData = pdf.pages[x]
                text = pageData.extract_text().lower()

                # Variables to keep track how to determine left values are the new one or the old one
                rightNew = 0     # rightNew = 1 means right value is the NEW one, rightNew = -1 means right value is the OLD one
                months = []     # months will contain the months of that particular page where keyWord is found
                years = []     # years will contain the heading of the years of that particular page where keyWord is found, [-1] is the oldYear, [-2] is the newYear
                days = []
                daysIndexToTry = [-1, 1, -2, 2]

                # Checking if the keyword is found in a particular page
                for row in text.split('\n'):
                    if row.strip().strip('-').startswith(keyWord):
                        found = 1

                        # To get the full row name that starts with keyWord
                        rowName = ""
                        for i in row:
                            if (i.isdigit() or i in specialCharacters):
                                break
                            else:
                                rowName += i
                        rowName = rowName.strip()
                        rowName = rowName.capitalize()

                        # Since the values of a financial statement is always the last few values
                        # Following example is assuming oldVal is the most right value, and the newVal is the one left of it
                        # Possible like page 9 of sample1.pdf, where there are 4 values instead

                        # Need to get the heading as well to know which values belongs to which year / month
                        # Using a for loop and work backwards into the pdf until we find a heading (rightNew != 0)

                        for diffPages in range(x, -1, -1):
                            textHeading = pdf.pages[diffPages].extract_text().lower()

                            # Limit the search for headings in the first 100 words
                            for word in textHeading.split()[:100]:

                                # To get the months
                                if word in possibleMonths:
                                    months.append(word)

                                    # After getting the month, try to get the day
                                    for i in range(0, 101):
                                        if (textHeading.split()[i] == word):

                                            try:
                                                if (type(daysIndexToTry) is list):
                                                    for daysIndex in daysIndexToTry:
                                                        if (textHeading.split()[i + daysIndex].strip().strip(',').isdigit() and len(textHeading.split()[i + daysIndex].strip().strip(',')) <= 2):
                                                            days.append(int(textHeading.split()[i + daysIndex].strip().strip(',')))
                                                            daysIndexToTry = daysIndex
                                                elif (type(daysIndexToTry is int)):
                                                    if (textHeading.split()[i + daysIndexToTry].strip().strip(',').isdigit() and len(textHeading.split()[i + daysIndexToTry].strip().strip(',')) <= 2):
                                                            days.append(int(textHeading.split()[i + daysIndexToTry].strip().strip(',')))
                                            except:
                                                continue

                                # To determine which month is the earlier one, assuming there are only 2 months value
                                if (len(months) >= 2):

                                    # Case 1, when the most right values are the OLD values
                                    if (possibleMonths.index(months[-1]) > possibleMonths.index(months[-2])):
                                        oldMonth = months[-1].capitalize()
                                        newMonth = months[-2].capitalize()
                                        sameMonth = 0
                                        rightNew = -1

                                    # Case 2, when the most right values are the NEW values
                                    elif (possibleMonths.index(months[-1]) < possibleMonths.index(months[-2])):
                                        oldMonth = months[-2].capitalize()
                                        newMonth = months[-1].capitalize()
                                        sameMonth = 0
                                        rightNew = 1

                                    # Case 3, when the months are the same, need to compare the years
                                    else:
                                        oldMonth = newMonth = months[-1].capitalize()
                                        sameMonth = 1
                                        rightNew = 0

                                # If only one month value found in heading
                                elif (len(months) == 1):
                                    oldMonth = newMonth = months[-1].capitalize()
                                    sameMonth = 1
                                    rightNew = 0

                                # If only no month values are found in heading
                                elif (len(months) == 0):
                                    oldMonth = newMonth = ""

                                # To get the units
                                if word in possibleUnits:
                                    if (word[0].isalpha()):
                                        if not unitMultiply:
                                            if ("million" in word):
                                                unitMultiply = 1000000
                                            if ("thousand" in word):
                                                unitMultiply = 1000
                                            if ("hundred" in word):
                                                unitMultiply = 100
                                        else:
                                            continue
                                    else:
                                        unitMultiplyString = "1" + word.replace("'", '')
                                        unitMultiplyString = unitMultiplyString.replace("’", '')
                                        unitMultiply = int(unitMultiplyString.replace('$',''))

                                # To get the years
                                try:
                                    if int(word) in possibleYears:
                                        years.append(int(word))
                                except (ValueError):
                                    continue

                            # Comparing the years
                            if (len(years) >= 2):

                                # Case 1: right values are the NEW values
                                if (years[-1] > years[-2]):
                                    newYear = years[-1]
                                    oldYear = years[-2]
                                    rightNew = 1
                                    sameYear = 0

                                # Case 2: right values are the OLD values
                                elif (years[-1] < years[-2]):
                                    oldYear = years[-1]
                                    newYear = years[-2]
                                    rightNew = -1
                                    sameYear = 0

                                # Case 3: both years are the same, need to compare the months
                                else:
                                    oldYear = newYear = years[-1]
                                    sameYear = 1

                            # If only one month value found in heading
                            elif (len(years) == 1):
                                oldYear = newYear = years[-1]
                                sameYear = 1

                            # If only no month values are found in heading
                            elif (len(years) == 0):
                                oldYear = newYear = ""         

                            # To check whether heading has been found, if found, break, else, continue finding backwards
                            if (rightNew != 0):
                                break

                        # Once we know which value is the NEW one, either right or left, based on the variable rightNew
                        # Checking whether that particular row has any valid values to gather
                        # (by checking whether is there any digits in the string)

                        valid1 = 0     # If valid = 1 by the end of the loop means at least 1 digit in the string, thus valid
                        valid2 = 0

                        try:
                            for i in row.split()[-1]:
                                if i.isdigit():
                                    valid1 = 1

                            if (row.split()[-2] in specialCharacters):
                                for i in row.split()[-3]:
                                    if i.isdigit():
                                        valid2 = 1
                            else:
                                for i in row.split()[-2]:
                                    if i.isdigit():
                                        valid2 = 1

                            # If not valid, continue to next row to check
                            if (valid1 == 0 or valid2 == 0):
                                continue

                        except:
                            continue

                        # rightNew == 1 means right value is the NEW one
                        if (rightNew == 1):
                            newVal = becomeNumber(row.split()[-1])

                            # To account for a possible dollar sign beforehand
                            if (row.split()[-2] in specialCharacters):
                                oldVal = becomeNumber(row.split()[-3])
                            else:
                                oldVal = becomeNumber(row.split()[-2])

                            if (unitMultiply):
                                oldVal *= unitMultiply
                                newVal *= unitMultiply

                            # If either value returns 0 from the function, means invalid
                            if (oldVal == 0 or newVal == 0):
                                continue
                            else:
                                change = calculateChange(oldVal, newVal)

                            # To get newDay and oldDay
                            if (len(days) >= 2):
                                newDay = days[-1]
                                oldDay = days[-2]
                            elif (len(days) == 1):
                                oldDay = newDay = days[-1]
                            else:
                                oldDay = newDay = 0

                        elif (rightNew == -1):
                            oldVal = becomeNumber(row.split()[-1])

                            # To account for a possible dollar sign beforehand
                            if (row.split()[-2] in specialCharacters):
                                newVal = becomeNumber(row.split()[-3])
                            else:
                                newVal = becomeNumber(row.split()[-2])

                            if (unitMultiply):
                                oldVal *= unitMultiply
                                newVal *= unitMultiply

                            # If either value returns 0 from the function, means invalid
                            if (oldVal == 0 or newVal == 0):
                                continue
                            else:
                                change = calculateChange(oldVal, newVal)

                            # To get newDay and oldDay
                            if (len(days) >= 2):
                                oldDay = days[-1]
                                newDay = days[-2]
                            elif (len(days) == 1):
                                oldDay = newDay = days[-1]
                            else:
                                oldDay = newDay = 0

                        changeVal = newVal - oldVal

                        # Formatting the date string
                        newDate = ""
                        oldDate = ""

                        if (newMonth and not newDay):
                            newDate += newMonth.capitalize() + ", "
                        elif (newMonth and newDay):
                            newDate += newMonth.capitalize() + " "
                        if (newDay):
                            newDate += str(newDay) + ", "
                        if (newYear):
                            newDate += str(newYear)

                        if (oldMonth and not oldDay):
                            oldDate += oldMonth.capitalize() + ", "
                        elif (oldMonth and oldDay):
                            oldDate += oldMonth.capitalize() + " "
                        if (oldDay):
                            oldDate += str(oldDay) + ", "
                        if (oldYear):
                            oldDate += str(oldYear)

                        # Printing out the drafting respectively based on the different cases
                        try:

                            if (change < 0):
                                dictToRT["mdna"][title].append("Our {} expenses decreased by ${:,.2f} ({:.2f})% to ${:,.2f} in {}, from ${:,.2f} in {}, as a result of [company to provide reason].".format(rowName, abs(changeVal), abs(change), newVal, newDate, oldVal , oldDate))

                            elif (change > 0):
                                dictToRT["mdna"][title].append("Our {} expenses increased by ${:,.2f} ({:.2f})% to ${:,.2f} in {}, from ${:,.2f} in {}, as a result of [company to provide reason].".format(rowName, abs(changeVal), abs(change), newVal, newDate, oldVal, oldDate))
                            else:
                                dictToRT["mdna"][title].append("Our {} expenses stayed the same to ${:,.2f} in {}, from ${:,.2f} in {}, as a result of [company to provide reason].".format(rowName, newVal, newDate, oldVal, oldDate))
                            print()

                        except:
                            continue
        dictToRT["isComplete"] = True
        
    except:
        dictToRT["isComplete"] = True
        dictToRT["isError"] = True
        
    return dictToRT

def generate_mda_main(usrKeyword, pdf_file):
    pdf, reader = read_pdf(pdf_file)
    return find_keywork_in_pdf(usrKeyword, pdf, reader)