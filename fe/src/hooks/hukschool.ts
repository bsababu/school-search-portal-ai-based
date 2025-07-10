import { useState } from 'react'

type School = {
  location: string
  name: string
  programs: string
  program_type: string
  duration: string
  application_deadline: string
  scholarships: string
  website: string
  tuition_fee: string
  language: string
  acceptance_rate: string
  visa_process: string
  description: string
}


export function useSchoolSearch() {
  const [results, setResults] = useState<School[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const search = async (query: string, origin: string, bach_or_mst: string) => {
    if (!query || !origin || !bach_or_mst) return
    setLoading(true)
    setError(null)
    setResults([])
    try {
      const res = await fetch(`/api/v1/schools?query=${query}&origin=${origin}&bach_or_mst=${bach_or_mst}`)
      // if (res.status === 500 ) {
      //   setError('No schools found, please try again with different query');
      //   setLoading(false);
      //   return;
      // }
      if (!res.ok) throw new Error('No schools found');
      const data = await res.json();
      setResults(data);
    } catch (err) {
      setError('Something went wrong while searching.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return { results, loading, error, search }
}