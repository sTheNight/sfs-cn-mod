export const homeCardInfo: HomeCardInfo[] = [
  {
    title: "关于下载",
    description: "所有文件均存储于云盘，点击下载将跳转至对应网盘链接。建议使用浏览器自带下载功能以获得最佳体验。"
  },
  {
    title: "免责声明",
    description: "本站所有汉化模组仅供学习交流使用，请于下载后24小时内删除，禁止用于商业用途。部分模组可能存在加载报错或空白文本等BUG。"
  },
  {
    title: "交流反馈",
    description: "QQ群：923038827\nUP主：A Future star\n欢迎反馈汉化问题与模组兼容性情况"
  }
]
export interface HomeCardInfo {
  title: string,
  description: string
}
