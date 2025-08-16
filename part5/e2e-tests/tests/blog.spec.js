const { test, expect, beforeEach, describe, mergeTests } = require("@playwright/test")
const { loginWith, createBlog } = require('./helper')
const { before } = require("node:test")

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('api/testing/reset')
    await request.post('api/users', {
      data: {
        name: 'Markus',
        username: 'mUm222',
        password: 'salajane'
      }
    })

    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('Log in to application')).toBeVisible()
    await expect(page.getByTestId('username-input')).toBeVisible()
    await expect(page.getByTestId('password-input')).toBeVisible()
    await expect(page.getByText('login')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'mUm222', 'salajane')
      await expect(page.getByText('Markus logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'mUm222', 'mitteniisalajane')
      const errorMessage = page.locator('.notification')
      await expect(page.getByText('Markus logged in')).not.toBeVisible()
      await expect(errorMessage).toContainText('wrong username or password')
      await expect(errorMessage).toHaveCSS('color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'mUm222', 'salajane')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'M Blog', 'Markus', 'https://anewblog.com')
      const blog = page.locator('.blogHidden')
      await expect(blog).toBeVisible()
      await expect(blog).toHaveText('M Blog Markus view')
    })

    describe('and several blogs exists', () => {

      test('the blog can be liked', async ({ page }) => {
        await createBlog(page, 'firstBlog', 'Markus', 'https://anewblog.com')
        await page.getByRole('button', { name: 'view' }).click()
        await page.getByRole('button', { name: 'like'}).click()
        const likes = page.locator('.likes')
        await expect(likes).toHaveText('likes 1 like')
      })

      test('user who added the blog can delete the blog', async ({ page, request }) => {
        await createBlog(page, 'firstBlog', 'Markus', 'https://anewblog.com')
        await page.getByRole('button', { name: 'view' }).click()
        await page.getByRole('button', { name: 'like'}).click()
        await page.getByRole('button', { name: 'delete' }).click()
        page.on('dialog', async dialog => {
          await dialog.accept()
        })
        await expect(page.getByText('Deleted firstBlog by Markus')).toBeVisible()
      })

      test('only the user who added the blog sees the blogs delete button', async ({ page, request}) => {
        await createBlog(page, 'firstBlog', 'Markus', 'https://anewblog.com')
        await page.getByRole('button', { name: 'log out' }).click()
        await request.post('api/users', {
          data: {
            username: 'test',
            name: 'Ted4ee',
            password: 'toomuchman'
          },
        })
        await page.goto('/')
        await loginWith(page, 'test', 'toomuchman')

        await page.getByRole('button', { name: 'view' }).click()
        await expect(page.getByRole('button', { name: 'remove '})).not.toBeVisible()
      })

      test('blogs should be sorted', async ({ page }) => {
        await createBlog(page, 'firstBlog', 'Markus', 'https://anewblog.com')
        await createBlog(page, 'secondBlog', 'Markus', 'https://anewblog.com')

        const first = page.locator('.blog').filter({ hasText: 'firstBlog'})
        const second = page.locator('.blog').filter({ hasText: 'secondBlog'})

        await first.getByRole('button', { name: 'view' }).click()
        await first.getByRole('button', { name: 'like' }).click()
        await first.getByRole('button', { name: 'like' }).click()

        await second.getByRole('button', { name: 'view' }).click()
        await second.getByRole('button', { name: 'like' }).click()

        expect(page.locator('.blog').first()).toContainText('firstBlog')
        expect(page.locator('.blog').last()).toContainText('secondBlog')
      })
    })
  })
})
