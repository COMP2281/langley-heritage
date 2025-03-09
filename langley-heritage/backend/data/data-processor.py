import pandas as pd

def convert_xlsx_to_csv(inPath, outPath, desiredColumns):
	data = pd.read_excel(inPath, parse_dates=['DOB', 'DOD', 'BURIAL DATE'])
	data = data[desiredColumns] # Keep only desired columns
	data.to_csv(outPath, index=False)

def main():
	inPath = input("Enter the Excel spreadsheet filepath: ")

	desiredColumns = ['SURNAME', 'FIRST NAME', 'MIDDLE NAMES', 'DOB', 'DOD', 'BURIAL DATE',
		'AGE', 'PLOT NUMBER', 'BURIAL/ASHES', 'ADDRESS', 'NO. IN BOOK', 'OTHER',
		'INSCRIPTION', 'PERSONAL LINKS', 'GROUP LINKS']
	convert_xlsx_to_csv(inPath, "burialrecords.csv", desiredColumns)

if __name__ == "__main__":
	main()