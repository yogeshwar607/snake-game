/// <reference types="cypress" />

describe('My First Test', () => {
  it('Does not do much!', () => {
    expect(true).to.equal(true)
  })
})

describe('Visit player entry route', () => {
  it('Visit playerentry', () => {
    cy.visit('http://34.66.100.28:3000/playerentry')
  })
})

describe('Visit game entry route', () => {
  it('Visit game entry', () => {
    cy.visit('http://34.66.100.28:3000/gameentry')
  })
})