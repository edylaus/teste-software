/**
 * Representa a entidade Fornecedor exposta pela API.
 * Faz o mapeamento entre as colunas (snake_case) da tabela
 * `fornecedores` e o formato (camelCase) utilizado nas respostas HTTP.
 */
class Fornecedor {
  constructor(row) {
    this.id = row.id_fornecedor;
    this.razaoSocial = row.razao_social;
    this.cnpj = row.cnpj;
    this.endereco = row.endereco;
    this.telefone = row.telefone;
    this.email = row.email;
    this.segmento = row.segmento;
    this.status = row.status;
    this.dataCadastro = row.data_cadastro;
    this.dataAtualizacao = row.data_atualizacao;
  }

  static fromRow(row) {
    return row ? new Fornecedor(row) : null;
  }

  static fromRows(rows) {
    return rows.map((row) => new Fornecedor(row));
  }
}

module.exports = Fornecedor;
