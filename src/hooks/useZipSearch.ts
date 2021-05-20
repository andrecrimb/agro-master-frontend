import { useMutation } from 'react-query'
import axios, { AxiosError } from 'axios'

type SearchResponse = {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
  ibge: string
  gia: string
  ddd: string
  siafi: string
}

const useZipSearch = () => {
  return useMutation<SearchResponse, AxiosError, string>(async (zip: string) => {
    const { data } = await axios.get<SearchResponse>(`/ws/${zip}/json/`)
    return data
  })
}

export default useZipSearch
