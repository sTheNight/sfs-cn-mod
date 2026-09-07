import { createI18n } from 'vue-i18n'

export type AppLocale = 'zh-CN' | 'zh-TW' | 'zh-HK'

const messages = {
  'zh-CN': {
    language: { name: '简体中文', title: '语言', description: '选择界面显示语言' },
    nav: { mods: '模组', tutorial: '教程', about: '关于' },
    common: {
      select: '选择', reset: '重置', cancel: '取消', save: '保存', submit: '提交',
      download: '下载', details: '详情', retry: '重试', back: '返回', loading: '加载中...',
    },
    layout: {
      title: '汉化模组下载中心', sponsor: '赞助支持', sponsorThanks: '感谢你的支持，我们会继续更新优质汉化模组！',
      welcome: '欢迎访问 SFS 汉化模组站',
      warning: '本站所有模组均为汉化版本，仅供学习交流使用。\n下载前请确认您已了解模组安装方法。',
      extraPrefix: '额外说明：本站为重写版并非原站点，部分功能特性可能未同步，如有需要请访问',
      originalSite: '原站点', neverShow: '不再显示', enter: '进入',
    },
    settings: {
      title: '设置', close: '关闭设置', interface: '界面', theme: '主题', themeDesc: '选择主题模式',
      cardOpacity: '卡片透明度', opacityLow: '真的要这样吗：', opacityVeryLow: '你喜欢就好：',
      backgroundStyle: '背景样式', backgroundStyleDesc: '选择主页背景样式',
      cardBlur: '卡片模糊效果', cardBlurDesc: '实验性功能，建议降低卡片透明度食用',
      customBackground: '自定义背景', imageSource: '图片来源', imageSourceDesc: '背景图片从哪里来呢',
      backgroundImage: '背景图片', localImageDesc: '从本机选择一张图片，最大 10 MB', clearImage: '清除背景图片',
      urlDesc: '请输入一个 URL', blur: '模糊强度', opacity: '透明度', opacityWarning: '这合适吗：',
      effects: '效果', animations: '动画效果', animationsDesc: '关闭后将减少动画效果，或许能提升一定的页面渲染性能',
      transition: '切换动画', transitionDesc: '选择路由切换动画，需要开启动画效果后才能生效',
      ripple: '水波纹效果', rippleDesc: '按住按钮后的水波纹效果', titleGlow: '标题发光',
      titleGlowDesc: '主页标题的发光效果，可能有兼容性问题', actions: '操作', reset: '重置设置', resetDesc: '清除自定义设置选项',
      notImage: '你选择的好像不是图片', imageTooLarge: '这背景图有点大了吧', imageSaveFailed: '图片保存失败，请检查浏览器存储权限',
    },
    options: {
      theme: { system: '跟随系统', light: '浅色模式', dark: '深色模式' },
      transition: { 'x-fade': 'X 轴切换', 'y-fade': 'Y 轴切换', 'opacity-fade': '淡入淡出', none: '无动画' },
      background: { none: '无背景', grid: '网格背景', 'custom-image': '自定义图片' },
      imageSource: { local: '本地', url: '自定义 URL' },
    },
    mods: {
      fileCount: '共 {count} 个文件', category: '分类', searchPlaceholder: '请输入关键字',
      notice: '声明：本站所有汉化模组仅供学习交流，请于下载后24小时内删除，禁止用于商业用途。部分模组存在加载完报错、部件名称描述为空白等 bug',
      closeNotice: '关闭声明', loadFailed: '加载失败：{error}', empty: '未找到符合条件的模组',
      copied: '已复制链接', sharing: '正在调起分享', shareTitle: '分享这个模组', coverAlt: '{name}封面',
      categories: { all: '全部', engine: '发动机', function: '功能性部件', entertain: '娱乐性部件', skin: '涂装包' },
    },
    tutorial: { android: '安卓', ios: 'iOS', pc: 'PC', qa: '常见问题' },
    info: {
      aboutUs: '关于我们', introPlaceholder: '请输入文本', intro: 'SFS 汉化模组下载中心，为 Spaceflight Simulator 玩家提供优质汉化模组资源。',
      originalSite: '原版站点', credits: '鸣谢名单', statements: '声明信息', assist: '协助制作', hosting: '子站点托管', testing: '模组辅助测试',
      cards: {
        downloadTitle: '关于下载', downloadDesc: '所有文件均存储于云盘，点击下载将跳转至对应网盘链接。建议使用浏览器自带下载功能以获得最佳体验。',
        disclaimerTitle: '免责声明', disclaimerDesc: '本站所有汉化模组仅供学习交流使用，请于下载后24小时内删除，禁止用于商业用途。部分模组可能存在加载报错或空白文本等 BUG。',
        feedbackTitle: '交流反馈', feedbackDesc: 'QQ群：923038827\nUP主：A Future star\n欢迎反馈汉化问题与模组兼容性情况',
      },
    },
    notFound: { title: '404 没有找到', description: '人生无常，大肠包小肠', home: '回到主页' },
  },
  'zh-TW': {
    language: { name: '繁體中文', title: '語言', description: '選擇介面顯示語言' },
    nav: { mods: '模組', tutorial: '教學', about: '關於' },
    common: {
      select: '選擇', reset: '重設', cancel: '取消', save: '儲存', submit: '提交',
      download: '下載', details: '詳情', retry: '重試', back: '返回', loading: '載入中...',
    },
    layout: {
      title: '漢化模組下載中心', sponsor: '贊助支持', sponsorThanks: '感謝你的支持，我們會繼續更新優質漢化模組！',
      welcome: '歡迎造訪 SFS 漢化模組站',
      warning: '本站所有模組均為漢化版本，僅供學習交流使用。\n下載前請確認您已瞭解模組安裝方法。',
      extraPrefix: '額外說明：本站為重寫版而非原站點，部分功能特性可能尚未同步，如有需要請造訪',
      originalSite: '原站點', neverShow: '不再顯示', enter: '進入',
    },
    settings: {
      title: '設定', close: '關閉設定', interface: '介面', theme: '主題', themeDesc: '選擇主題模式',
      cardOpacity: '卡片透明度', opacityLow: '真的要這樣嗎：', opacityVeryLow: '你喜歡就好：',
      backgroundStyle: '背景樣式', backgroundStyleDesc: '選擇首頁背景樣式',
      cardBlur: '卡片模糊效果', cardBlurDesc: '實驗性功能，建議降低卡片透明度使用',
      customBackground: '自訂背景', imageSource: '圖片來源', imageSourceDesc: '選擇背景圖片來源',
      backgroundImage: '背景圖片', localImageDesc: '從本機選擇一張圖片，最大 10 MB', clearImage: '清除背景圖片',
      urlDesc: '請輸入 URL', blur: '模糊強度', opacity: '透明度', opacityWarning: '這樣合適嗎：',
      effects: '效果', animations: '動畫效果', animationsDesc: '關閉後將減少動畫效果，或許能提升頁面渲染效能',
      transition: '切換動畫', transitionDesc: '選擇路由切換動畫，需要開啟動畫效果後才能生效',
      ripple: '水波紋效果', rippleDesc: '按住按鈕後的水波紋效果', titleGlow: '標題發光',
      titleGlowDesc: '首頁標題的發光效果，可能有相容性問題', actions: '操作', reset: '重設設定', resetDesc: '清除自訂設定選項',
      notImage: '你選擇的好像不是圖片', imageTooLarge: '這張背景圖似乎太大了', imageSaveFailed: '圖片儲存失敗，請檢查瀏覽器儲存權限',
    },
    options: {
      theme: { system: '跟隨系統', light: '淺色模式', dark: '深色模式' },
      transition: { 'x-fade': 'X 軸切換', 'y-fade': 'Y 軸切換', 'opacity-fade': '淡入淡出', none: '無動畫' },
      background: { none: '無背景', grid: '網格背景', 'custom-image': '自訂圖片' },
      imageSource: { local: '本機', url: '自訂 URL' },
    },
    mods: {
      fileCount: '共 {count} 個檔案', category: '分類', searchPlaceholder: '請輸入關鍵字',
      notice: '聲明：本站所有漢化模組僅供學習交流，請於下載後 24 小時內刪除，禁止用於商業用途。部分模組可能發生載入錯誤、部件名稱或描述空白等問題',
      closeNotice: '關閉聲明', loadFailed: '載入失敗：{error}', empty: '找不到符合條件的模組',
      copied: '已複製連結', sharing: '正在開啟分享', shareTitle: '分享這個模組', coverAlt: '{name}封面',
      categories: { all: '全部', engine: '發動機', function: '功能性部件', entertain: '娛樂性部件', skin: '塗裝包' },
    },
    tutorial: { android: 'Android', ios: 'iOS', pc: 'PC', qa: '常見問題' },
    info: {
      aboutUs: '關於我們', introPlaceholder: '請輸入文字', intro: 'SFS 漢化模組下載中心，為 Spaceflight Simulator 玩家提供優質漢化模組資源。',
      originalSite: '原版站點', credits: '鳴謝名單', statements: '聲明資訊', assist: '協助製作', hosting: '子站點託管', testing: '模組輔助測試',
      cards: {
        downloadTitle: '關於下載', downloadDesc: '所有檔案均儲存於雲端硬碟，點擊下載將前往對應連結。建議使用瀏覽器內建下載功能以獲得最佳體驗。',
        disclaimerTitle: '免責聲明', disclaimerDesc: '本站所有漢化模組僅供學習交流，請於下載後 24 小時內刪除，禁止用於商業用途。部分模組可能發生載入錯誤或文字空白等問題。',
        feedbackTitle: '交流回饋', feedbackDesc: 'QQ 群：923038827\nUP 主：A Future star\n歡迎回饋漢化問題與模組相容性情況',
      },
    },
    notFound: { title: '404 找不到頁面', description: '人生無常，大腸包小腸', home: '回到首頁' },
  },
  'zh-HK': {
    language: { name: '粵語', title: '語言', description: '揀介面顯示語言' },
    nav: { mods: '模組', tutorial: '教學', about: '關於' },
    common: {
      select: '揀選', reset: '重設', cancel: '取消', save: '儲存', submit: '提交',
      download: '下載', details: '詳情', retry: '再試', back: '返去', loading: '載入緊...',
    },
    layout: {
      title: '漢化模組下載中心', sponsor: '贊助支持', sponsorThanks: '多謝你支持，我哋會繼續更新優質漢化模組！',
      welcome: '歡迎嚟到 SFS 漢化模組站',
      warning: '本站所有模組都係漢化版本，只供學習交流使用。\n下載之前，請確認你已經知道點樣安裝模組。',
      extraPrefix: '額外說明：本站係重寫版，唔係原站點，部分功能可能未同步；有需要可以去',
      originalSite: '原站點', neverShow: '唔再顯示', enter: '進入',
    },
    settings: {
      title: '設定', close: '閂設定', interface: '介面', theme: '主題', themeDesc: '揀主題模式',
      cardOpacity: '卡片透明度', opacityLow: '真係要咁樣？：', opacityVeryLow: '你鍾意就好：',
      backgroundStyle: '背景樣式', backgroundStyleDesc: '揀首頁背景樣式',
      cardBlur: '卡片模糊效果', cardBlurDesc: '實驗性功能，建議降低卡片透明度使用',
      customBackground: '自訂背景', imageSource: '圖片來源', imageSourceDesc: '張背景圖由邊度嚟？',
      backgroundImage: '背景圖片', localImageDesc: '喺部機揀一張圖片，最大 10 MB', clearImage: '清除背景圖片',
      urlDesc: '請輸入一個 URL', blur: '模糊強度', opacity: '透明度', opacityWarning: '咁樣合適咩？：',
      effects: '效果', animations: '動畫效果', animationsDesc: '閂咗之後會減少動畫效果，可能會提升頁面渲染效能',
      transition: '切換動畫', transitionDesc: '揀路由切換動畫，要開咗動畫效果先會生效',
      ripple: '水波紋效果', rippleDesc: '撳住按鈕之後嘅水波紋效果', titleGlow: '標題發光',
      titleGlowDesc: '首頁標題嘅發光效果，可能有相容性問題', actions: '操作', reset: '重設設定', resetDesc: '清除自訂設定選項',
      notImage: '你揀嗰個好似唔係圖片', imageTooLarge: '張背景圖好似太大喇', imageSaveFailed: '圖片儲存失敗，請檢查瀏覽器儲存權限',
    },
    options: {
      theme: { system: '跟隨系統', light: '淺色模式', dark: '深色模式' },
      transition: { 'x-fade': 'X 軸切換', 'y-fade': 'Y 軸切換', 'opacity-fade': '淡入淡出', none: '冇動畫' },
      background: { none: '冇背景', grid: '網格背景', 'custom-image': '自訂圖片' },
      imageSource: { local: '本機', url: '自訂 URL' },
    },
    mods: {
      fileCount: '一共有 {count} 個檔案', category: '分類', searchPlaceholder: '請輸入關鍵字',
      notice: '聲明：本站所有漢化模組只供學習交流，請喺下載後 24 小時內刪除，禁止用喺商業用途。部分模組可能會載入出錯、部件名稱或者描述留白',
      closeNotice: '閂聲明', loadFailed: '載入失敗：{error}', empty: '搵唔到符合條件嘅模組',
      copied: '已複製連結', sharing: '開緊分享', shareTitle: '分享呢個模組', coverAlt: '{name}封面',
      categories: { all: '全部', engine: '發動機', function: '功能性部件', entertain: '娛樂性部件', skin: '塗裝包' },
    },
    tutorial: { android: 'Android', ios: 'iOS', pc: 'PC', qa: '常見問題' },
    info: {
      aboutUs: '關於我哋', introPlaceholder: '請輸入文字', intro: 'SFS 漢化模組下載中心，為 Spaceflight Simulator 玩家提供優質漢化模組資源。',
      originalSite: '原版站點', credits: '鳴謝名單', statements: '聲明資訊', assist: '協助製作', hosting: '子站點託管', testing: '模組輔助測試',
      cards: {
        downloadTitle: '關於下載', downloadDesc: '所有檔案都放喺雲端硬碟，撳下載就會去相應嘅連結。建議用瀏覽器內置下載功能，體驗會最好。',
        disclaimerTitle: '免責聲明', disclaimerDesc: '本站所有漢化模組只供學習交流，請喺下載後 24 小時內刪除，禁止用喺商業用途。部分模組可能會載入出錯或者文字留白。',
        feedbackTitle: '交流回饋', feedbackDesc: 'QQ 群：923038827\nUP 主：A Future star\n歡迎回饋漢化問題同模組相容性情況',
      },
    },
    notFound: { title: '404 搵唔到頁面', description: '人生無常，大腸包小腸', home: '返去首頁' },
  },
} as const

const savedLocale = localStorage.getItem('sfs-locale')
const initialLocale: AppLocale = savedLocale === 'zh-TW' || savedLocale === 'zh-CN' || savedLocale === 'zh-HK'
  ? savedLocale
  : navigator.language.toLowerCase().includes('hk') || navigator.language.toLowerCase().includes('mo')
    ? 'zh-HK'
    : navigator.language.toLowerCase().includes('tw')
    ? 'zh-TW'
    : 'zh-CN'

export const i18n = createI18n({
  legacy: false,
  locale: initialLocale,
  fallbackLocale: {
    'zh-HK': ['zh-TW'],
    default: ['zh-CN'],
  },
  messages,
})

export function setDocumentLocale(locale: AppLocale) {
  localStorage.setItem('sfs-locale', locale)
  document.documentElement.lang = locale
}

setDocumentLocale(initialLocale)
