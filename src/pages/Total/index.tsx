import { useState, useEffect } from 'react'
import { Header } from "../../components/Header";
import { Container, Content, LabelStyle } from "./styles";

import api from '../../services/api'

interface ITotal {
  id: string;
  line_number: string;
  chip_number: string;
  data_plan: string;
  account_number: string;
  telephone_operator: string;
}

export function Total() {
  // const [totalLineVivo, setTotalLineVivo] = useState(0)
  // const [totalDDD24, setTotalDDD24] = useState(0)
  // const [totalDDD21, setTotalDDD21] = useState(0)
  // const [totalDDD31, setTotalDDD31] = useState(0)
  const [telefonia, setTelefonia] = useState<ITotal[]>([])

  async function loadTelephone() {
    const dataTelephone = await api.get('/telephoneline').then(dados => dados.data)
    if (dataTelephone) {
      setTelefonia(dataTelephone)
      // telephone = dataTelephone
      // setTotalLineVivo(telephone
      //   .filter(tel => tel.telephone_operator === 'VIVO')
      //   .length)
      // let totalDDD24 = 0
      // let totalDDD21 = 0
      // let totalDDD31 = 0
      // telephone.map(tel => {
      //   let [ddd, linha] = tel.line_number.split('-')
      //   if (ddd === '24') {
      //     totalDDD24 += 1
      //   } else if (ddd = '21') {
      //     totalDDD21 += 1
      //   } else if (ddd = '31') {
      //     totalDDD31 += 1
      //   }
      // })
      // setTotalDDD21(totalDDD21)
      // setTotalDDD24(totalDDD24)
      // setTotalDDD31(totalDDD31)
    }
  }

  useEffect(() => {
    loadTelephone()
  }, [])

  function totalOperator(operator: string) {
      return telefonia.filter(tel => tel.telephone_operator===operator).length
  }

  function totalPlaner(planer: string) {
    return telefonia.filter(tel => tel.data_plan===planer).length
}

function totallINEDDD(ddd: string) {
  return telefonia.filter(tel => tel.line_number.substring(0,2) ===ddd).length
}

  return (
    <Container>
      <Header title="Totais" />

      <Content>
        <LabelStyle>Total de linhas Vivo: {totalOperator('vivo')}</LabelStyle>
        <LabelStyle>Total de linhas Vivo: {totalOperator('claro')}</LabelStyle>
        <LabelStyle>Total Plano de 10G: {totalPlaner('10GB')}</LabelStyle>
        <LabelStyle>Total Plano de 20G: {totalPlaner('20GB')}</LabelStyle>
        <LabelStyle>Total Plano de 30G: {totalPlaner('30GB')}</LabelStyle>
        <LabelStyle>Total DE LINHAS COM ddd 21: {totallINEDDD('21')}</LabelStyle>
      </Content>
    </Container>
  )
}