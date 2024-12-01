'use server'

import { sql } from '@vercel/postgres'

export async function getGroceryList() {
    try {
        const { rows } = await sql`
      SELECT * FROM grocery_items
      ORDER BY created_at DESC
    `
        return { items: rows }
    } catch (error) {
        return { error: 'Failed to fetch grocery items' }
    }
}

export async function addGroceryItem(name: string, status: 'need' | 'maybe') {
    try {
        await sql`
      INSERT INTO grocery_items (name, status)
      VALUES (${name}, ${status})
    `
        return { success: true }
    } catch (error) {
        return { error: 'Failed to add grocery item' }
    }
}

export async function updateGroceryItemStatus(id: number, status: 'need' | 'maybe') {
    try {
        await sql`
      UPDATE grocery_items
      SET status = ${status}
      WHERE id = ${id}
    `
        return { success: true }
    } catch (error) {
        return { error: 'Failed to update grocery item status' }
    }
}

export async function removeGroceryItem(id: number) {
    try {
        await sql`
      DELETE FROM grocery_items
      WHERE id = ${id}
    `
        return { success: true }
    } catch (error) {
        return { error: 'Failed to remove grocery item' }
    }
}
