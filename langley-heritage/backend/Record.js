function StrOrNull(str)
{
	return str ? str : null
}

function GetDateYear(dateStr)
{
	let date = new Date(Date.parse(dateStr))
	return date.getFullYear()
}

function InferDobAndDod(record, dob, dod, age)
{
	// Assign values if given
	if (dob) record.dob = dob
	if (dod) record.dod = dod

	// Infer DOB/DOD from age
	if (!dob && dod && age)
		record.dob = (GetDateYear(dod) - parseInt(age)).toString()
	else if (!dod && dob && age)
		record.dod = (GetDateYear(dob) + parseInt(age)).toString()
}

class Record {
	constructor(surname, firstname, middlename, dob, dod, burialDate, plotNumber, burialType, address, graveLat, graveLong, description)
	{
		this.surname = surname
		this.firstname = firstname
		this.middlename = middlename
		this.dob = dob
		this.dod = dod
		this.burialDate = burialDate
		this.plotNumber = plotNumber
		this.burialType = burialType
		this.address = address
		this.graveLat = graveLat
		this.graveLong = graveLong
		this.description = description
	}

	static FromCSVRow(row)
	{
		let ret = new Record()
		ret.surname = StrOrNull(row['SURNAME'])
		ret.firstname = StrOrNull(row['FIRST NAME'])
		ret.middlename = StrOrNull(row['MIDDLE NAMES'])
		InferDobAndDod(ret, row['DOB'], row['DOD'], row['AGE'])
		ret.burialDate = StrOrNull(row['BURIAL DATE'])
		ret.plotNumber = StrOrNull(row['PLOT NUMBER'])
		ret.burialType = StrOrNull(row['BURIAL/ASHES'])
		ret.address = StrOrNull(row['ADDRESS'])
		ret.graveLat = null // TODO
		ret.graveLong = null // TODO
		ret.description = null // TODO

		return ret
	}
}

export { Record }