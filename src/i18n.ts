import { createI18n } from 'vue-i18n'

export type AppLocale = 'zh-CN' | 'zh-TW' | 'zh-HK'

const messages = {
  'zh-CN': {
    language: { name: '简体中文', title: '语言', description: '选择界面显示语言' },
    nav: { mods: '模组', tutorial: '教程', about: '关于' },
    common: {
      select: '选择', reset: '重置', cancel: '取消', save: '保存', submit: '提交',
      download: '下载', details: '详情', retry: '重试', back: '返回', loading: '加载中...',
      share: '分享', search: '搜索', close: '关闭', previous: '上一张', next: '下一张',
    },
    layout: {
      title: '汉化模组下载中心', sponsor: '赞助支持', sponsorThanks: '感谢你的支持，我们会继续更新优质汉化模组！',
      welcome: '欢迎访问 SFS 汉化模组站',
      warning: '本站所有模组均为汉化版本，仅供学习交流使用。\n下载前请确认您已了解模组安装方法。',
      extraPrefix: '额外说明：本站为重写版并非原站点，部分功能特性可能未同步，如有需要请访问',
      originalSite: '原站点', neverShow: '不再显示', enter: '进入', github: 'Github', feedback: '反馈',
      backToTop: '返回顶部', openSettings: '打开设置',
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
      experiment: '实验性', restoreDefault: '恢复默认值', unsavedChanges: '已更改但未保存',
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
    tutorialContent: {
      tipLabel: '小技巧：',
      android: {
        steps: [
          { title: '下载模组文件', description: '在本站找到需要的模组，点击“下载”按钮，将 ZIP 文件下载到手机。', code: '' },
          { title: '解压模组文件', description: '使用文件管理器（如 MT 管理器、ES 文件浏览器等）找到下载的 ZIP 文件，解压后会得到 pack 文件或文件夹。', code: '模组文件夹：Parts / Textures Packs' },
          { title: '定位游戏目录', description: '找到 SFS 游戏数据目录，路径通常为：某些手机系统的路径可能位于 data 内。', code: '/storage/emulated/0/Android/media/com.StefMorojna.SpaceflightSimulator/Mods/Custom_Assets/Parts/' },
          { title: '复制模组文件', description: '将解压后的模组文件夹复制到游戏目录下的对应位置：', code: '• pack 模组 → Parts/\n• 涂装模组 → Textures Packs/' },
          { title: '启动游戏验证', description: '重新启动 SFS，在主页面等待片刻，待模组加载器内显示该模组即为加载成功（注意下方的报错信息）。', code: '' },
        ],
        tip: '如果游戏加载模组速度过慢，可以尝试断网重启或开启 VPN。交流群：923038827',
      },
      ios: {
        steps: [
          { title: '下载并解压文件', description: '下载模组 ZIP 文件后，将其解压。', code: '' },
          { title: '定位游戏目录', description: 'iOS 游戏数据路径为：', code: '我的设备\\Spaceflight Simulator' },
          { title: '放置模组文件', description: '将解压后的模组移动到游戏目录的 Parts 或 Textures Packs 文件夹中，操作方式与 Android 类似。', code: '' },
          { title: '验证与排错', description: '重启游戏检查模组是否生效。iOS 系统对文件权限要求严格，如遇问题请检查文件读写权限。', code: '' },
        ],
      },
      pc: {
        warning: '重要提示：Steam 版 SFS 的模组安装路径与手机版不同，请注意区分。',
        steps: [
          { title: '下载模组文件', description: '从本站下载需要的模组 ZIP 文件，解压到电脑任意位置。', code: '' },
          { title: '找到游戏安装目录', description: 'Steam 版 SFS 的存档和模组路径通常为：也可以在 Steam 库中右键游戏 → 管理 → 浏览本地文件。', code: '你的 Steam 安装位置\\SteamLibrary\\steamapps\\common\\Spaceflight Simulator\\Spaceflight Simulator Game' },
          { title: '放置模组文件', description: '在游戏目录下创建或找到以下文件夹，将模组文件放入：', code: '• 部件 → Spaceflight Simulator\\Parts\\n• 涂装 → Spaceflight Simulator\\Textures Packs\\' },
          { title: '启动游戏', description: '通过 Steam 启动游戏，进入游戏检查新部件是否正常显示。', code: '' },
        ],
        tip: 'PC 版是本地加载，加载模组速度极快。',
      },
      qa: {
        steps: [
          { title: '部件名称显示为空白', description: '这是汉化模组的常见问题，说明汉化文件未正确加载或编码格式不匹配。解决方法：确保下载的是对应游戏版本的汉化包，并尝试重新安装汉化模组。' },
          { title: '模组部件不显示或显示异常', description: '可能原因：贴图文件缺失、模型文件损坏或与其他模组冲突。解决方法：检查模组文件是否完整，关闭其他模组测试，并查看游戏日志获取详细错误信息。' },
          { title: '如何卸载模组？', description: '找到游戏目录中对应的模组文件或文件夹，直接删除即可。建议：安装新模组前截图记录原有文件，方便卸载时恢复。' },
          { title: '多个模组能否同时安装？', description: '可以，但需要注意模组之间可能存在冲突。建议：一次只安装一个新模组，测试正常后再安装下一个，避免同时安装功能重复的模组。' },
          { title: '存档会受模组影响吗？', description: '使用模组部件建造的火箭存档，在卸载模组后可能无法正常加载（部件会消失）。建议：使用模组前备份存档，重要作品建议导出蓝图保存。' },
        ],
        feedback: '反馈交流：如遇其他问题，欢迎加入 QQ 群 923038827 交流讨论，或向模组作者反馈 bug。',
      },
    },
    modDetails: {
      loading: '正在加载模组信息...', loadError: '加载失败：{error}', backToList: '返回模组列表',
      notFoundTitle: '没有找到这个模组', notFoundDescription: '也许不存在，也许你打错名字了',
      author: '作者', version: '版本', compatibility: '兼容版本', updatedAt: '更新日期', size: '大小',
      description: '模组简介', rating: '评分', editRating: '编辑评分', ratingLoading: '正在加载评分...',
      ratingUnavailable: '评分暂时无法加载', averageRating: '平均分数 {rating} 分', ratingCount: '{count} 人评分',
      noRating: '暂无评分', screenshots: '模组截图', previewScreenshot: '预览{name}截图 {index}',
      screenshotAlt: '{name}截图 {index}', closePreview: '关闭预览', previousScreenshot: '上一张截图',
      nextScreenshot: '下一张截图', rateMod: '为模组评分',
    },
    info: {
      aboutUs: '关于我们', introPlaceholder: '请输入文本', intro: 'SFS 汉化模组下载中心，为 Spaceflight Simulator 玩家提供优质汉化模组资源。',
      qqGroup: 'QQ群：923038827', bilibili: 'B站：A-Future-star',
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
      share: '分享', search: '搜尋', close: '關閉', previous: '上一張', next: '下一張',
    },
    layout: {
      title: '漢化模組下載中心', sponsor: '贊助支持', sponsorThanks: '感謝你的支持，我們會繼續更新優質漢化模組！',
      welcome: '歡迎造訪 SFS 漢化模組站',
      warning: '本站所有模組均為漢化版本，僅供學習交流使用。\n下載前請確認您已瞭解模組安裝方法。',
      extraPrefix: '額外說明：本站為重寫版而非原站點，部分功能特性可能尚未同步，如有需要請造訪',
      originalSite: '原站點', neverShow: '不再顯示', enter: '進入', github: 'Github', feedback: '回饋',
      backToTop: '返回頂部', openSettings: '開啟設定',
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
      experiment: '實驗性', restoreDefault: '恢復預設值', unsavedChanges: '已變更但未儲存',
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
    tutorialContent: {
      tipLabel: '小技巧：',
      android: {
        steps: [
          { title: '下載模組檔案', description: '在本站找到需要的模組，點擊「下載」按鈕，將 ZIP 檔案下載到手機。', code: '' },
          { title: '解壓模組檔案', description: '使用檔案管理器（如 MT 管理器、ES 檔案瀏覽器等）找到下載的 ZIP 檔案，解壓後會得到 pack 檔案或資料夾。', code: '模組資料夾：Parts / Textures Packs' },
          { title: '定位遊戲目錄', description: '找到 SFS 遊戲資料目錄，路徑通常為：部分手機系統的路徑可能位於 data 內。', code: '/storage/emulated/0/Android/media/com.StefMorojna.SpaceflightSimulator/Mods/Custom_Assets/Parts/' },
          { title: '複製模組檔案', description: '將解壓後的模組資料夾複製到遊戲目錄下的對應位置：', code: '• pack 模組 → Parts/\n• 塗裝模組 → Textures Packs/' },
          { title: '啟動遊戲驗證', description: '重新啟動 SFS，在主頁面等待片刻，待模組載入器內顯示該模組即為載入成功（注意下方的錯誤訊息）。', code: '' },
        ],
        tip: '如果遊戲載入模組速度過慢，可以嘗試斷網重啟或開啟 VPN。交流群：923038827',
      },
      ios: {
        steps: [
          { title: '下載並解壓檔案', description: '下載模組 ZIP 檔案後，將其解壓。', code: '' },
          { title: '定位遊戲目錄', description: 'iOS 遊戲資料路徑為：', code: '我的裝置\\Spaceflight Simulator' },
          { title: '放置模組檔案', description: '將解壓後的模組移動到遊戲目錄的 Parts 或 Textures Packs 資料夾中，操作方式與 Android 類似。', code: '' },
          { title: '驗證與排錯', description: '重新啟動遊戲檢查模組是否生效。iOS 系統對檔案權限要求嚴格，如遇問題請檢查檔案讀寫權限。', code: '' },
        ],
      },
      pc: {
        warning: '重要提示：Steam 版 SFS 的模組安裝路徑與手機版不同，請注意區分。',
        steps: [
          { title: '下載模組檔案', description: '從本站下載需要的模組 ZIP 檔案，解壓到電腦任意位置。', code: '' },
          { title: '找到遊戲安裝目錄', description: 'Steam 版 SFS 的存檔和模組路徑通常為：也可以在 Steam 庫中右鍵遊戲 → 管理 → 瀏覽本機檔案。', code: '你的 Steam 安裝位置\\SteamLibrary\\steamapps\\common\\Spaceflight Simulator\\Spaceflight Simulator Game' },
          { title: '放置模組檔案', description: '在遊戲目錄下建立或找到以下資料夾，將模組檔案放入：', code: '• 部件 → Spaceflight Simulator\\Parts\\n• 塗裝 → Spaceflight Simulator\\Textures Packs\\' },
          { title: '啟動遊戲', description: '透過 Steam 啟動遊戲，進入遊戲檢查新部件是否正常顯示。', code: '' },
        ],
        tip: 'PC 版是本機載入，載入模組速度極快。',
      },
      qa: {
        steps: [
          { title: '部件名稱顯示為空白', description: '這是漢化模組的常見問題，表示漢化檔案未正確載入或編碼格式不匹配。解決方法：確保下載的是對應遊戲版本的漢化包，並嘗試重新安裝漢化模組。' },
          { title: '模組部件不顯示或顯示異常', description: '可能原因：貼圖檔案缺失、模型檔案損壞或與其他模組衝突。解決方法：檢查模組檔案是否完整，關閉其他模組測試，並查看遊戲日誌取得詳細錯誤資訊。' },
          { title: '如何解除安裝模組？', description: '找到遊戲目錄中對應的模組檔案或資料夾，直接刪除即可。建議：安裝新模組前截圖記錄原有檔案，方便解除安裝時恢復。' },
          { title: '多個模組能否同時安裝？', description: '可以，但需要注意模組之間可能存在衝突。建議：一次只安裝一個新模組，測試正常後再安裝下一個，避免同時安裝功能重複的模組。' },
          { title: '存檔會受模組影響嗎？', description: '使用模組部件建造的火箭存檔，在解除安裝模組後可能無法正常載入（部件會消失）。建議：使用模組前備份存檔，重要作品建議匯出藍圖保存。' },
        ],
        feedback: '回饋交流：如遇其他問題，歡迎加入 QQ 群 923038827 交流討論，或向模組作者回報 bug。',
      },
    },
    modDetails: {
      loading: '正在載入模組資訊...', loadError: '載入失敗：{error}', backToList: '返回模組列表',
      notFoundTitle: '找不到這個模組', notFoundDescription: '也許不存在，也許你打錯名稱了',
      author: '作者', version: '版本', compatibility: '相容版本', updatedAt: '更新日期', size: '大小',
      description: '模組簡介', rating: '評分', editRating: '編輯評分', ratingLoading: '正在載入評分...',
      ratingUnavailable: '評分暫時無法載入', averageRating: '平均分數 {rating} 分', ratingCount: '{count} 人評分',
      noRating: '暫無評分', screenshots: '模組截圖', previewScreenshot: '預覽{name}截圖 {index}',
      screenshotAlt: '{name}截圖 {index}', closePreview: '關閉預覽', previousScreenshot: '上一張截圖',
      nextScreenshot: '下一張截圖', rateMod: '為模組評分',
    },
    info: {
      aboutUs: '關於我們', introPlaceholder: '請輸入文字', intro: 'SFS 漢化模組下載中心，為 Spaceflight Simulator 玩家提供優質漢化模組資源。',
      qqGroup: 'QQ 群：923038827', bilibili: 'B 站：A-Future-star',
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
      share: '分享', search: '搜尋', close: '關閉', previous: '上一張', next: '下一張',
    },
    layout: {
      title: '漢化模組下載中心', sponsor: '贊助支持', sponsorThanks: '多謝你支持，我哋會繼續更新優質漢化模組！',
      welcome: '歡迎嚟到 SFS 漢化模組站',
      warning: '本站所有模組都係漢化版本，只供學習交流使用。\n下載之前，請確認你已經知道點樣安裝模組。',
      extraPrefix: '額外說明：本站係重寫版，唔係原站點，部分功能可能未同步；有需要可以去',
      originalSite: '原站點', neverShow: '唔再顯示', enter: '進入', github: 'Github', feedback: '回饋',
      backToTop: '返到頂部', openSettings: '開啟設定',
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
      experiment: '實驗性', restoreDefault: '恢復預設值', unsavedChanges: '已更改但未儲存',
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
    tutorialContent: {
      tipLabel: '小技巧：',
      android: {
        steps: [
          { title: '下載模組檔案', description: '喺本站搵到需要嘅模組，撳「下載」按鈕，將 ZIP 檔案下載到手機。', code: '' },
          { title: '解壓模組檔案', description: '用檔案管理器（例如 MT 管理器、ES 檔案瀏覽器等）搵到下載嘅 ZIP 檔案，解壓後會得到 pack 檔案或者資料夾。', code: '模組資料夾：Parts / Textures Packs' },
          { title: '定位遊戲目錄', description: '搵到 SFS 遊戲資料目錄，路徑通常係：部分手機系統嘅路徑可能喺 data 入面。', code: '/storage/emulated/0/Android/media/com.StefMorojna.SpaceflightSimulator/Mods/Custom_Assets/Parts/' },
          { title: '複製模組檔案', description: '將解壓後嘅模組資料夾複製到遊戲目錄下嘅相應位置：', code: '• pack 模組 → Parts/\n• 塗裝模組 → Textures Packs/' },
          { title: '啟動遊戲驗證', description: '重新啟動 SFS，喺主頁面等一陣，等模組載入器顯示該模組就代表載入成功（留意下面嘅錯誤訊息）。', code: '' },
        ],
        tip: '如果遊戲載入模組速度太慢，可以試下斷網重啟或者開 VPN。交流群：923038827',
      },
      ios: {
        steps: [
          { title: '下載並解壓檔案', description: '下載模組 ZIP 檔案後，將佢解壓。', code: '' },
          { title: '定位遊戲目錄', description: 'iOS 遊戲資料路徑係：', code: '我嘅裝置\\Spaceflight Simulator' },
          { title: '放置模組檔案', description: '將解壓後嘅模組移動到遊戲目錄嘅 Parts 或 Textures Packs 資料夾，操作方法同 Android 類似。', code: '' },
          { title: '驗證與排錯', description: '重啟遊戲檢查模組有冇生效。iOS 系統對檔案權限要求嚴格，如果有問題請檢查檔案讀寫權限。', code: '' },
        ],
      },
      pc: {
        warning: '重要提示：Steam 版 SFS 嘅模組安裝路徑同手機版唔同，請注意分辨。',
        steps: [
          { title: '下載模組檔案', description: '喺本站下載需要嘅模組 ZIP 檔案，解壓到電腦任意位置。', code: '' },
          { title: '搵到遊戲安裝目錄', description: 'Steam 版 SFS 嘅存檔同模組路徑通常係：亦可以喺 Steam 庫入面右鍵遊戲 → 管理 → 瀏覽本機檔案。', code: '你嘅 Steam 安裝位置\\SteamLibrary\\steamapps\\common\\Spaceflight Simulator\\Spaceflight Simulator Game' },
          { title: '放置模組檔案', description: '喺遊戲目錄下面建立或者搵到以下資料夾，將模組檔案放入：', code: '• 部件 → Spaceflight Simulator\\Parts\\n• 塗裝 → Spaceflight Simulator\\Textures Packs\\' },
          { title: '啟動遊戲', description: '透過 Steam 啟動遊戲，入到遊戲檢查新部件有冇正常顯示。', code: '' },
        ],
        tip: 'PC 版係本機載入，載入模組速度極快。',
      },
      qa: {
        steps: [
          { title: '部件名稱顯示空白', description: '呢個係漢化模組常見問題，代表漢化檔案未正確載入或者編碼格式唔匹配。解決方法：確保下載嘅係對應遊戲版本嘅漢化包，再試下重新安裝漢化模組。' },
          { title: '模組部件唔顯示或者顯示異常', description: '可能原因：貼圖檔案缺失、模型檔案損壞或者同其他模組衝突。解決方法：檢查模組檔案係咪完整，關閉其他模組測試，再睇遊戲日誌攞詳細錯誤資訊。' },
          { title: '點樣卸載模組？', description: '搵到遊戲目錄入面對應嘅模組檔案或者資料夾，直接刪除就得。建議：安裝新模組前影低原有檔案，方便卸載時恢復。' },
          { title: '可唔可以同時安裝多個模組？', description: '可以，但要留意模組之間可能有衝突。建議：一次只安裝一個新模組，測試正常先再裝下一個，避免同時安裝功能重複嘅模組。' },
          { title: '存檔會唔會受模組影響？', description: '用模組部件整嘅火箭存檔，卸載模組後可能無法正常載入（部件會消失）。建議：用模組前備份存檔，重要作品最好匯出藍圖保存。' },
        ],
        feedback: '回饋交流：如果遇到其他問題，歡迎加入 QQ 群 923038827 交流討論，或者向模組作者回報 bug。',
      },
    },
    modDetails: {
      loading: '載入緊模組資訊...', loadError: '載入失敗：{error}', backToList: '返去模組列表',
      notFoundTitle: '搵唔到呢個模組', notFoundDescription: '可能唔存在，可能你打錯名喇',
      author: '作者', version: '版本', compatibility: '相容版本', updatedAt: '更新日期', size: '大小',
      description: '模組簡介', rating: '評分', editRating: '編輯評分', ratingLoading: '載入緊評分...',
      ratingUnavailable: '評分暫時載入唔到', averageRating: '平均分數 {rating} 分', ratingCount: '{count} 人評分',
      noRating: '暫時冇評分', screenshots: '模組截圖', previewScreenshot: '預覽{name}截圖 {index}',
      screenshotAlt: '{name}截圖 {index}', closePreview: '關閉預覽', previousScreenshot: '上一張截圖',
      nextScreenshot: '下一張截圖', rateMod: '為模組評分',
    },
    info: {
      aboutUs: '關於我哋', introPlaceholder: '請輸入文字', intro: 'SFS 漢化模組下載中心，為 Spaceflight Simulator 玩家提供優質漢化模組資源。',
      qqGroup: 'QQ 群：923038827', bilibili: 'B 站：A-Future-star',
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
