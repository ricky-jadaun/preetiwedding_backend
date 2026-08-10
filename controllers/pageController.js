const Page = require('../models/Page');

// @desc    Get page content
// @route   GET /api/pages/:pageId
// @access  Public
const getPageContent = async (req, res) => {
  const { pageId } = req.params;
  const lang = req.query.language || req.query.lang; // Support both language and lang params if sent under-the-hood

  try {
    const page = await Page.findOne({ page: pageId });
    if (!page) {
      return res.status(404).json({ success: false, message: `Page '${pageId}' not found` });
    }

    // If a specific language is requested, we can return just that object, otherwise return the full document
    if (lang && (lang === 'en' || lang === 'fr')) {
      return res.json({
        success: true,
        page: pageId,
        language: lang,
        content: page[lang]
      });
    }

    res.json({
      success: true,
      page: page.page,
      en: page.en,
      fr: page.fr,
      updatedAt: page.updatedAt
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update page content (Admin only)
// @route   PUT /api/pages/:pageId
// @access  Protected
const updatePageContent = async (req, res) => {
  const { pageId } = req.params;
  const { lang, content } = req.body;

  if (!lang || !['en', 'fr'].includes(lang)) {
    return res.status(400).json({ success: false, message: 'Please specify a valid language (en or fr)' });
  }

  if (!content) {
    return res.status(400).json({ success: false, message: 'Content to update is required' });
  }

  try {
    let page = await Page.findOne({ page: pageId });
    if (!page) {
      return res.status(404).json({ success: false, message: `Page '${pageId}' not found` });
    }

    // Update only the specified language content using Mongoose $set to avoid overwriting the other language
    const updateField = {};
    updateField[lang] = content;

    const updatedPage = await Page.findOneAndUpdate(
      { page: pageId },
      { $set: updateField },
      { new: true }
    );

    res.json({
      success: true,
      message: `Successfully updated '${lang}' content for page '${pageId}'`,
      page: updatedPage.page,
      lang: lang,
      content: updatedPage[lang]
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getPageContent,
  updatePageContent
};
