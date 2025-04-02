import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useBrasileiraoStore = defineStore('brasileirao', () => {
  const times = ref([
    { id: 1, nome: 'Atlético MG' },
    { id: 2, nome: 'Bahia' },
    { id: 3, nome: 'Botafogo' },
    { id: 4, nome: 'Bragantino' },
    { id: 5, nome: 'Ceará' },
    { id: 6, nome: 'Corinthians' },
    { id: 7, nome: 'Cruzeiro' },
    { id: 8, nome: 'Flamengo' },
    { id: 9, nome: 'Fluminense' },
    { id: 10, nome: 'Fortaleza' },
    { id: 11, nome: 'Grêmio' },
    { id: 12, nome: 'Internacional' },
    { id: 13, nome: 'Juventude' },
    { id: 14, nome: 'Mirassol' },
    { id: 15, nome: 'Palmeiras' },
    { id: 16, nome: 'Santos' },
    { id: 17, nome: 'São Paulo' },
    { id: 18, nome: 'Sport' },
    { id: 19, nome: 'Vasco' },
    { id: 20, nome: 'Vitória' },
  ])

  const jogos = ref([
    { id: 1, rodadaId: 1, timeCasaId: 17, timeForaId: 18, golsCasa: null, golsFora: null },
    { id: 2, rodadaId: 1, timeCasaId: 7, timeForaId: 14, golsCasa: null, golsFora: null },
    { id: 3, rodadaId: 1, timeCasaId: 11, timeForaId: 1, golsCasa: null, golsFora: null },
    { id: 4, rodadaId: 1, timeCasaId: 10, timeForaId: 9, golsCasa: null, golsFora: null },
    { id: 5, rodadaId: 1, timeCasaId: 13, timeForaId: 20, golsCasa: null, golsFora: null },
    { id: 6, rodadaId: 1, timeCasaId: 8, timeForaId: 12, golsCasa: null, golsFora: null },
    { id: 7, rodadaId: 1, timeCasaId: 15, timeForaId: 3, golsCasa: null, golsFora: null },
    { id: 8, rodadaId: 1, timeCasaId: 19, timeForaId: 16, golsCasa: null, golsFora: null },
    { id: 9, rodadaId: 1, timeCasaId: 2, timeForaId: 6, golsCasa: null, golsFora: null },
    { id: 10, rodadaId: 1, timeCasaId: 4, timeForaId: 5, golsCasa: null, golsFora: null },
  ])

  const tabela = computed(() => {
    const tableBase = times.value.map((time) => ({
      timeId: time.id,
      nome: time.nome,
      pontos: 0,
      jogos: 0,
      vitorias: 0,
      empates: 0,
      derrotas: 0,
    }))

    jogos.value.forEach((jogo) => {
      if (jogo.golsCasa !== null && jogo.golsFora !== null) {
        const timeCasa = tableBase.find((t) => t.timeId === jogo.timeCasaId)
        const timeFora = tableBase.find((t) => t.timeId === jogo.timeForaId)

        timeCasa.jogos += 1
        timeFora.jogos += 1

        if (jogo.golsCasa > jogo.golsFora) {
          timeCasa.pontos += 3
          timeCasa.vitorias += 1
          timeFora.derrotas += 1
        } else if (jogo.golsCasa < jogo.golsFora) {
          timeFora.pontos += 3
          timeFora.vitorias += 1
          timeCasa.derrotas += 1
        } else {
          timeCasa.pontos += 1
          timeFora.pontos += 1
          timeCasa.empates += 1
          timeFora.empates += 1
        }
      }
    })

    const tabelaOrdenada = tableBase.sort((a, b) => b.pontos - a.pontos)

    return tabelaOrdenada.map((time, index) => ({
      ...time,
      posicao: index + 1,
    }))
  })

  const atualizarPlacar = (jogoId, golsCasa, golsFora) => {
    const jogo = jogos.value.find((j) => j.id === jogoId)

    if (jogo) {
      const golsCasaNum =
        golsCasa !== null && !isNaN(Number(golsCasa)) ? Math.max(0, Number(golsCasa)) : null
      const golsForaNum =
        golsFora !== null && !isNaN(Number(golsFora)) ? Math.max(0, Number(golsFora)) : null

      const jogoAtualizado = { ...jogo, golsCasa: golsCasaNum, golsFora: golsForaNum }

      const index = jogos.value.findIndex((j) => j.id === jogoId)
      if (index !== -1) {
        jogos.value[index] = jogoAtualizado
      }
    }
  }

  return {
    times,
    jogos,
    tabela,
    atualizarPlacar,
  }
})
