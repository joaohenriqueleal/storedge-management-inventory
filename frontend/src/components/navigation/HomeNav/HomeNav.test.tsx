import { render, screen } from '@testing-library/react'
import { describe, test, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import HomeNav from './HomeNav'

function renderWithRoute(route: string) {
    return render(
        <MemoryRouter initialEntries={[route]}>
            <HomeNav />
        </MemoryRouter>
    )
}

describe('HomeNav', () => {
    test('should render all navigation links', () => {
        renderWithRoute('/')

        expect(screen.getByText('Home')).toBeInTheDocument()
        expect(screen.getByText('Categorias')).toBeInTheDocument()
        expect(screen.getByText('Produtos')).toBeInTheDocument()
        expect(screen.getByText('Combos')).toBeInTheDocument()
        expect(screen.getByText('Perfil')).toBeInTheDocument()
    })

    test('should mark Home as active on "/" route', () => {
        renderWithRoute('/')

        const home = screen.getByText('Home').closest('a')
        expect(home).toHaveClass('text-gray-500')
    })

    test('should mark Categorias as active', () => {
        renderWithRoute('/categorias')

        const categorias = screen.getByText('Categorias').closest('a')
        expect(categorias).toHaveClass('text-gray-500')
    })

    test('should mark Produtos as active', () => {
        renderWithRoute('/produtos')

        const produtos = screen.getByText('Produtos').closest('a')
        expect(produtos).toHaveClass('text-gray-500')
    })

    test('should mark Combos as active', () => {
        renderWithRoute('/combos')

        const combos = screen.getByText('Combos').closest('a')
        expect(combos).toHaveClass('text-gray-500')
    })

    test('should mark Perfil as active', () => {
        renderWithRoute('/configuracoes')

        const perfil = screen.getByText('Perfil').closest('a')
        expect(perfil).toHaveClass('text-gray-500')
    })

    test('should not mark other links as active', () => {
        renderWithRoute('/produtos')

        const home = screen.getByText('Home').closest('a')
        const produtos = screen.getByText('Produtos').closest('a')

        expect(produtos).toHaveClass('text-gray-500')
        expect(home).not.toHaveClass('text-gray-500')
    })
})
