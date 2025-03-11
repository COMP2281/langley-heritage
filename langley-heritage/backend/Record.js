function strOrNull(str)
{
	return str ? str : null
}

function intOrNull(str)
{
	return str ? parseInt(str) : null
}

function getDateYear(dateStr)
{
	let date = new Date(Date.parse(dateStr))
	return date.getFullYear()
}

function inferDobAndDod(record, dob, dod, age)
{
	// Assign values if given
	record.age = intOrNull(age)
	if (dob) record.dob = dob
	if (dod) record.dod = dod

	// Infer DOB/DOD from age
	if (!dob && dod && age)
		record.dob = (getDateYear(dod) - parseInt(age)).toString()
	else if (!dod && dob && age)
		record.dod = (getDateYear(dob) + parseInt(age)).toString()
}

class Record {
	constructor(surname, firstname, middlename, dob, dod, age, burialDate, plotNumber, burialType, address, graveLat, graveLong, description)
	{
		this.surname = surname
		this.firstname = firstname
		this.middlename = middlename
		this.dob = dob
		this.dod = dod
		this.age = age
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
		ret.surname = strOrNull(row['SURNAME'])
		ret.firstname = strOrNull(row['FIRST NAME'])
		ret.middlename = strOrNull(row['MIDDLE NAMES'])
		inferDobAndDod(ret, row['DOB'], row['DOD'], row['AGE'])
		ret.burialDate = strOrNull(row['BURIAL DATE'])
		ret.plotNumber = strOrNull(row['PLOT NUMBER'])
		ret.burialType = strOrNull(row['BURIAL/ASHES'])
		ret.address = strOrNull(row['ADDRESS'])
		ret.graveLat = null // TODO
		ret.graveLong = null // TODO
		ret.description = null // TODO

		return ret
	}
}

export { Record }