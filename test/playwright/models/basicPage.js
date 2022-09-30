const { test, expect } = require('@playwright/test')
const { BasePage } = require('./basePage')
class BasicPage extends BasePage {
  constructor (page) {
    super(page)
    this.page = page

    this.saveBtn = page.locator('button:has-text("Save & Apply")')
    this.discardBtn = page.locator('button:has-text("Discard")')
    this.showExploreChk = page.locator('[aria-label="Show\ \[Explore\]\ page"]')
    this.i18n = {
      EN: {
        languageSelect: page.locator('.setting-block:has-text("language") label'),
        languageListBtn: page.locator('[role="listbox"] >> text=english'),
        saveBtn: page.locator('button:has-text("Save & Apply")'),
        saveAlert: page.locator('[role="alert"]:has-text("Save preferences successfully!")')
      },
      CN: {
        languageSelect: page.locator('.setting-block:has-text("语言") label'),
        languageListBtn: page.locator('[role="listbox"] >> text=简体中文'),
        saveBtn: page.locator('button:has-text("保存并应用")'),
        saveAlert: page.locator('[role="alert"]:has-text("偏好设置成功")')
      },
      TW: {
        languageSelect: page.locator('.setting-block:has-text("語言") label'), 
        languageListBtn: page.locator('[role="listbox"] >> text=繁體中文'),
        saveBtn: page.locator('button:has-text("保存並應用")'),
        saveAlert: page.locator('[role="alert"]:has-text("偏好設置成功")')
      }
    }
    this.saveAlert = page.locator('[role="alert"]:has-text("Save preferences successfully!")')
  }

  async saveLanguage (startLanguage, targetLanguage) {
    let basicPage
    if (startLanguage === 'EN') basicPage = 'basicLink'
    else basicPage = 'basicLink_' + startLanguage
    await this.jumpPage(basicPage)
    await this.i18n[startLanguage].languageSelect.click()
    await this.i18n[targetLanguage].languageListBtn.click()
    await this.i18n[targetLanguage].saveBtn.click()
    await this.i18n[targetLanguage].saveAlert.waitFor()
  }

  async saveSetting () {
    await this.saveBtn.click()
    await this.saveAlert.waitFor()
  }
}

module.exports = { BasicPage }