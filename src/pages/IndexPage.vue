<template>
  <q-page class="q-pa-md">
    <div class="text-center q-mb-lg">
      <h1 class="text-primary text-weight-bold q-my-none">
        <q-icon name="sports_soccer" size="md" class="q-mr-sm" />
        Simulador Brasileirão
      </h1>
      <p class="text-grey-8">Simule resultados e veja a classificação atualizada</p>
    </div>

    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-5">
        <q-card flat bordered class="bg-grey-1">
          <q-card-section>
            <div class="text-h6 text-primary q-mb-sm">
              <q-icon name="sports" class="q-mr-xs" />
              Jogos
            </div>

            <q-list bordered separator>
              <q-item v-for="jogo in jogos" :key="jogo.id" class="q-py-md">
                <q-item-section>
                  <div class="row items-center justify-between">
                    <div class="col-4 text-right">
                      <div class="text-weight-medium">{{ getNomeTime(jogo.timeCasaId) }}</div>
                    </div>

                    <div class="col-4 row justify-center items-center">
                      <q-input
                        v-model.number="jogo.golsCasa"
                        type="number"
                        dense
                        outlined
                        class="placar-input"
                        min="0"
                        @update:model-value="handleGolsCasaChange(jogo)"
                      />
                      <div class="q-px-sm text-bold">x</div>
                      <q-input
                        v-model.number="jogo.golsFora"
                        type="number"
                        dense
                        outlined
                        class="placar-input"
                        min="0"
                        @update:model-value="handleGolsForaChange(jogo)"
                      />
                    </div>

                    <div class="col-4 text-left">
                      <div class="text-weight-medium">{{ getNomeTime(jogo.timeForaId) }}</div>
                    </div>
                  </div>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-md-7">
        <q-card flat bordered class="bg-grey-1">
          <q-card-section>
            <div class="text-h6 text-primary q-mb-sm">
              <q-icon name="leaderboard" class="q-mr-xs" />
              Classificação
            </div>
            <q-table
              :rows="tabela"
              :columns="colunas"
              row-key="timeId"
              dense
              :pagination="{ rowsPerPage: 20 }"
              :loading="false"
              class="classificacao-table"
              no-data-label="Sem dados para exibir"
            >
              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td key="posicao" :props="props" auto-width>
                    <div class="posicao-badge">
                      {{ props.row.posicao }}
                    </div>
                  </q-td>
                  <q-td key="nome" :props="props">
                    {{ props.row.nome }}
                  </q-td>
                  <q-td key="pontos" :props="props" class="text-weight-bold">
                    {{ props.row.pontos }}
                  </q-td>
                  <q-td key="jogos" :props="props">{{ props.row.jogos }}</q-td>
                  <q-td key="vitorias" :props="props">{{ props.row.vitorias }}</q-td>
                  <q-td key="empates" :props="props">{{ props.row.empates }}</q-td>
                  <q-td key="derrotas" :props="props">{{ props.row.derrotas }}</q-td>
                </q-tr>
              </template>
            </q-table>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { useBrasileiraoStore } from '../stores/brasileirao'
import { storeToRefs } from 'pinia'

const store = useBrasileiraoStore()
const { jogos, tabela } = storeToRefs(store)
const { atualizarPlacar } = store

function handleGolsCasaChange(jogo) {
  atualizarPlacar(jogo.id, jogo.golsCasa, jogo.golsFora)
}

function handleGolsForaChange(jogo) {
  atualizarPlacar(jogo.id, jogo.golsCasa, jogo.golsFora)
}

const colunas = [
  { name: 'posicao', label: '#', field: 'posicao', align: 'center', sortable: false },
  { name: 'nome', label: 'Time', field: 'nome', align: 'left', sortable: true },
  { name: 'pontos', label: 'PTS', field: 'pontos', align: 'center', sortable: true },
  { name: 'jogos', label: 'J', field: 'jogos', align: 'center', sortable: true },
  { name: 'vitorias', label: 'V', field: 'vitorias', align: 'center', sortable: true },
  { name: 'empates', label: 'E', field: 'empates', align: 'center', sortable: true },
  { name: 'derrotas', label: 'D', field: 'derrotas', align: 'center', sortable: true },
]

function getNomeTime(timeId) {
  const time = store.times.find((t) => t.id === timeId)

  if (!time) {
    return ''
  }

  return time.nome
}
</script>

<style scoped>
.placar-input {
  width: 60px;
}

.posicao-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  font-weight: bold;
  font-size: 0.8rem;
  background-color: #e0e0e0;
  color: #424242;
}

.classificacao-table :deep(.q-table__top) {
  padding: 8px 16px;
}
</style>
