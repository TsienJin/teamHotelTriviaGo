import PyPDF2  # For numPages
import requests
import pdfplumber
from datetime import date


def read_pdf(pdf_file):
    pdf = pdfplumber.open(pdf_file)
    reader = PyPDF2.PdfFileReader(pdf_file)
    numPages = reader.numPages
    print("There are {} pages in this pdf".format(numPages))
    return pdf, reader


# Return the change in percentage %
def calculateChange(oldVal, newVal):
    return (newVal - oldVal) / oldVal * 100


# Return float
def becomeNumber(string):
    thingsToReplace = [',', '(', ')']

    for i in thingsToReplace:
        string = string.replace(i, '')

    return float(string)


# Iterating all pages of PDF to find keyWord
def find_keywork_in_pdf(keyWord, pdf, reader):
    # Variables to keep track how to determine left values are the new one or the old one

    found = 0     # If found = 1, means found the keyWord in PDF, if found = 0, means cannot find keyWord in PDF, need key in a new keyWord again
    sameMonth = 1     # If sameMonth = 1, means need to compare by years for the time period
    sameYear = 1     # If sameYear = 1, means need to compare by months for the time period
    rightNew = 0     # rightNew = 1 means right value is the NEW one, rightNew = -1 means right value is the OLD one

    # Other variables

    possibleYears = range(1900, date.today().year + 1)
    # The months are listed backwards and in small letters so it's not caps-sensitive, and can compare in terms of index values to see which is earlier
    possibleMonths = ["december", "november", "october", "september", "august", "july", "june", "may", "april", "march", "february", "january"]
    months = []     # months will contain the months of that particular page where keyWord is found
    years = []     # years will contain the heading of the years of that particular page where keyWord is found, [-1] is the oldYear, [-2] is the newYear

    # Iterating all pages of PDF to find keyWord
    for x in range(reader.numPages):
        pageData = pdf.pages[x]
        text = pageData.extract_text().lower()
    #     print(text)
        
        # Checking if the keyword is found in a particular page
        for row in text.split('\n'):
            if row.startswith(keyWord):
                found = 1
                
    #             # Since the values of a financial statement is always the last few values
    #             # Following example is assuming oldVal is the most right value, and the newVal is the one left of it
    #             # Possible like page 9 of sample1.pdf, where there are 4 values instead
    #             oldVal = becomeNumber(row.split()[-1])
    #             newVal = becomeNumber(row.split()[-2])
    #             change = calculateChange(oldVal, newVal)
                
                # Need to get the heading as well to know which values belongs to which year / month
                for word in text.split():
                    
                    # Trying to get the months
                    if word in possibleMonths: #and word not in months:
                        months.append(word)
                    
                    # To determine which month is the earlier one, assuming there are only 2 months value
                    if (len(months) >= 2):
                        
                        # Case 1, when the most right values are the OLD values
                        if (possibleMonths.index(months[-1]) > possibleMonths.index(months[-2])):
                            oldMonth = months[-1]
                            newMonth = months[-2]
                            sameMonth = 0
                            rightNew = -1
                        
                        # Case 2, when the most right values are the NEW values
                        elif (possibleMonths.index(months[-1]) < possibleMonths.index(months[-2])):
                            oldMonth = months[-2]
                            newMonth = months[-1]
                            sameMonth = 0
                            rightNew = 1
                    
                        # Case 3, when the months are the same, need to compare the years
                        else:
                            sameMonth = 1
                            rightNew = 0
                    
                    # Trying to get the years
                    try:
                        if int(word) in possibleYears: #and int(word) not in years:
                            years.append(int(word))
                    except (ValueError):
                        continue
                        
                # Comparing the years
                
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
                    sameYear = 1
                
                # Once we know which value is the NEW one, either right or left, based on the variable rightNew
                
                # rightNew == 1 means right value is the NEW one
                if (rightNew == 1):
                    newVal = becomeNumber(row.split()[-1])
                    oldVal = becomeNumber(row.split()[-2])
                    change = calculateChange(oldVal, newVal)
                    
                elif (rightNew == -1):
                    oldVal = becomeNumber(row.split()[-1])
                    newVal = becomeNumber(row.split()[-2])
                    change = calculateChange(oldVal, newVal)
                
                # Printing out the drafting respectively based on the different cases
                # [] means need to fill in
                
                if (change < 0):
                    if (sameYear == 0 and sameMonth == 0):
                        print("Our {} expenses decreased by {:.2f}% to S$[{}] in the [{}{}], from S$[{}] in the [{}{}], as a result of [company to provide reason].".format(keyWord, abs(change), newVal, newMonth, newYear, oldVal, oldMonth, oldYear))
                    elif (sameYear == 1):
                        print("Our {} expenses decreased by {:.2f}% to S$[{}] in the [{}], from S$[{}] in the [{}], as a result of [company to provide reason].".format(keyWord, abs(change), newVal, newMonth, oldVal, oldMonth))
                    elif (sameMonth == 1):
                        print("Our {} expenses decreased by {:.2f}% to S$[{}] in the [{}], from S$[{}] in the [{}], as a result of [company to provide reason].".format(keyWord, abs(change), newVal, newYear, oldVal, oldYear))
                
                elif (change > 0):
                    if (sameYear == 0 and sameMonth == 0):
                        print("Our {} expenses increased by {:.2f}% to S$[{}] in the [{}{}], from S$[{}] in the [{}{}], as a result of [company to provide reason].".format(keyWord, abs(change), newVal, newMonth, newYear, oldVal, oldMonth, oldYear))
                    elif (sameYear == 1):
                        print("Our {} expenses increased by {:.2f}% to S$[{}] in the [{}], from S$[{}] in the [{}], as a result of [company to provide reason].".format(keyWord, abs(change), newVal, newMonth, oldVal, oldMonth))
                    elif (sameMonth == 1):
                        print("Our {} expenses increased by {:.2f}% to S$[{}] in the [{}], from S$[{}] in the [{}], as a result of [company to provide reason].".format(keyWord, abs(change), newVal, newYear, oldVal, oldYear))
                        
                else:
                    if (sameYear == 0 and sameMonth == 0):
                        print("Our {} expenses stayed the same to S$[{}] in the [{}{}], from S$[{}] in the [{}{}], as a result of [company to provide reason].".format(keyWord, newVal, newMonth, newYear, oldVal, oldMonth, oldYear))
                    elif (sameYear == 1):
                        print("Our {} expenses stayed the same to S$[{}] in the [{}], from S$[{}] in the [{}], as a result of [company to provide reason].".format(keyWord, newVal, newMonth, oldVal, oldMonth))
                    elif (sameMonth == 1):
                        print("Our {} expenses stayed the same to S$[{}] in the [{}], from S$[{}] in the [{}], as a result of [company to provide reason].".format(keyWord, newVal, newYear, oldVal, oldYear))
                
    if (found == 0):
        print("Please double check the keyword to look for and try again")
        print(quit)
        quit()
        
    # # For error checking
    # print("months =")
    # print(months)
    # print("years =")
    # print(years)
    # print("found = {}, sameMonth = {}, sameYear = {}, rightNew = {}".format(found, sameMonth, sameYear, rightNew))


def generate_mda_main(keyword, pdf_file):
    pdf, reader = read_pdf(pdf_file)
    find_keywork_in_pdf(keyword, pdf, reader)
