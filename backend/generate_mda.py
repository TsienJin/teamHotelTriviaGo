import PyPDF2  # For numPages
import requests
import pdfplumber
from datetime import date


def read_pdf():
    file = open("../sampleFinancialStatements/sample1.pdf", "rb")
    pdf = pdfplumber.open(file)
    reader = PyPDF2.PdfFileReader(file)
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
    # If found = 1, means found the keyWord in PDF, if found = 0, means cannot find keyWord in PDF, need key in a new keyWord again
    found = 0
    possibleYears = range(1900, date.today().year + 1)
    years = [
    ]  # years will contain the heading of the years of that particular page where keyWord is found, [-1] is the oldYear, [-2] is the newYear

    for x in range(reader.numPages):
        pageData = pdf.pages[x]
        text = pageData.extract_text().lower()
        #     print(text)

        # Checking if the keyword is found in a particular page
        for row in text.split('\n'):
            if row.startswith(keyWord):
                found = 1

                # Since the values of a financial statement is always the last few values
                # Following example is assuming oldVal is the most right value, and the newVal is the one left of it
                # Possible like page 9 of sample1.pdf, where there are 4 values instead
                oldVal = becomeNumber(row.split()[-1])
                newVal = becomeNumber(row.split()[-2])
                change = calculateChange(oldVal, newVal)

                # Need to get the heading as well to know which values belongs to which year / month
                for word in text.split():
                    try:
                        if int(word) in possibleYears:
                            years.append(int(word))
                    except (ValueError):
                        continue
                oldYear = years[-1]
                newYear = years[-2]

                # Checking if change is positive or negative, then printing out the drafting respectively
                # [] means need to fill in
                if (change < 0):
                    print(
                        "Our {} expenses decreased by {:.2f}% to S$[{}] in the [{}], from S$[{}] in the [{}], as a result of [company to provide reason]."
                        .format(keyWord, change, newVal, newYear, oldVal,
                                oldYear))
                if (change > 0):
                    print(
                        "Our {} expenses increased by {:.2f}% to S$[{}] in the [{}], from S$[{}] in the [{}], as a result of [company to provide reason]."
                        .format(keyWord, change, newVal, newYear, oldVal,
                                oldYear))

    if (found == 0):
        print("Please double check the keyword to look for and try again")


def generate_mda_main(keyword):
    pdf, reader = read_pdf()
    find_keywork_in_pdf(keyword, pdf, reader)
