
'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { useSchoolSearch } from '@/hooks/hukschool'
import { motion } from 'framer-motion'
import { getNames } from 'country-list';

const countries = getNames(); // This will be an array of all country names

// const countries = ['Rwanda', 'Germany', 'USA', 'Ethiopia', 'Kenya', 'Nigeria', 'Tanzania', 'Uganda', 'Zambia', 'South Africa']
const program_type = ['Bachelors', 'Masters', 'PhD', 'Vocational']
export default function Home() {
  const [query, setQuery] = useState('')
  const [origin, setOrigin] = useState('')
  const [bach_or_mst, setBachOrMst] = useState('')
  const { results, loading, error, search } = useSchoolSearch()

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query && origin && bach_or_mst) {
      search(query, origin, bach_or_mst)
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 text-black flex flex-col items-center justify-center px-6">
      <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center tracking-tight bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        Search for the School you want to study in</h1>
      <p className="text-center text-lg text-muted-foreground max-w-xl mb-10">
        Search universities and scholarship opportunities worldwide based on your study interests and country of origin.
        Please note that the application deadlines, tuition fees.
        🔔 other details may vary, and it's important to verify these with the universities directly.</p>

      <div className="w-full max-w-2xl mb-5">
        <div className="flex-1 items-center rounded-xl px-2 py-2 ">
          <Input
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="I want to study law in Germany"
            className="flex-1 rounded-full text-black shadow-gray-600 space-x-1 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <div className="flex  rounded-full px-2 py-2  space-x-2">
            <Select onValueChange={setOrigin}>
              <SelectTrigger className="bg-slate-200 text-black rounded-full px-4 shadow-md py-1 flex items-center">
                <span className="text-2xl mr-2">🌍</span>
                <SelectValue placeholder="your origin Country" />
              </SelectTrigger>

              <SelectContent>
                {countries.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select onValueChange={setBachOrMst}>
              <SelectTrigger className="bg-slate-200 text-black rounded-full px-4 py-1 flex items-center">
                <span className="text-2xl mr-2">🎓</span>
                <SelectValue placeholder="Bachelors or Masters or Phd" />
              </SelectTrigger>
              <SelectContent>
                {program_type.map((b) => (
                  <SelectItem key={b} value={b}>{b}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              onClick={() => search(query, origin, bach_or_mst)}
              disabled={!query || !origin || !bach_or_mst || loading}
              className="border-s-gray-800 hover:border-s-gray-200 rounded-full text-white px-4 py-1 place-content-end shadow-md"
            >
              {loading ? 'Loading...' : 'Search'}
            </Button>
          </div>
        </div>
        {loading && <p className="text-sm text-gray-400 animate-pulse mt-2 text-center">Processing your request, please wait...</p>}
        {error && <p className="text-sm text-red-400 mt-2 text-center">{error}</p>}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="grid gap-2 max-w-5xl w-full mt-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {results.map((school, idx) => (
            <Card key={idx} className="bg-white border border-gray-300 rounded-2xl shadow-md flex flex-col overflow-hidden">
              <CardContent className="p-4 flex-1 flex flex-col">
                <h2 className="text-xl font-bold mb-2 text-amber-800">{school.name}</h2>
                <p className="text-gray-700 mb-4 line-clamp-2 text-sm inline-block w-fit h-fit ">{school.description}</p>
                <div className="mt-auto">
                  <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-1">
                    {school.location && <span><strong>Location:</strong> {school.location}</span>}
                    {school.programs && <span><strong>Programs:</strong> {school.programs}</span>}
                    {school.program_type && <span><strong>Program Type:</strong> {school.program_type}</span>}
                    {school.tuition_fee && <span><strong>Tuition Fee:</strong> {school.tuition_fee}</span>}<br />
                    {school.language && <span><strong>Language:</strong> {school.language}</span>}
                    {school.duration && <span><strong>Duration:</strong> {school.duration}</span>}
                    {school.application_deadline && <span><strong>Application Deadline:</strong> {school.application_deadline}</span>}
                    {school.scholarships && <span><strong>Scholarships:</strong> {school.scholarships}</span>}
                    {school.tuition_fee && <span><strong>Tuition Fee:</strong> {school.tuition_fee}</span>}
                    {school.acceptance_rate && <span><strong>Acceptance Rate:</strong> {school.acceptance_rate}</span>}
                    {school.visa_process && <span><strong>Visa Process:</strong> {school.visa_process}</span>}
                    {school.website && <a href={school.website} target="_blank" className="text-blue-500 underline font-sans mb-1">Visit school website.</a>}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
    </main>
  )
}
