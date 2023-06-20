import { Parser } from '@json2csv/plainjs'

import User from '../classes/User'
import { CsvErrors } from '../utils/utils'
import { IUser } from '../types/user'

interface UseCsvConfig {
	getFileName: () => string
	onError: (message: string) => void
}

export default function useCsvApi({ onError, getFileName }: UseCsvConfig) {
	const csvParse = (data: IUser[]) => {
		try {
			const parser = new Parser()
			const dto = data.map((obj) => new User(obj).csvView())
			const csv = parser.parse(dto)
			return csv
		} catch (err) {
			console.error(err)
		}
	}

	const csvDownload = (data: IUser[]) => {
		try {
			const csv = csvParse(data) || ''
			const url = URL.createObjectURL(
				new Blob([csv], { type: 'txt/csv' })
			)
			const anchor = document.createElement('a')
			anchor.href = url
			anchor.download = getFileName()
			anchor.click()
			URL.revokeObjectURL(url)
		} catch (error) {
			onError(CsvErrors.EXPORT_CSV_EXCEPTION)
		}
	}

	return {
		csvDownload,
	}
}
