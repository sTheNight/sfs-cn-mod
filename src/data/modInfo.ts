import type { ModData, ModInfo } from "@/models/ModInfo";
import axios from "axios";

export const files: ModInfo[] = [];

const MOD_INFO_URL = "https://sfszhmod.pages.dev/data/data.json";

let hasLoaded = false;
let loadingPromise: Promise<ModInfo[]> | null = null;

export async function getModInfo(forceRefresh = false): Promise<ModInfo[]> {
  if (loadingPromise) return loadingPromise;
  if (hasLoaded && !forceRefresh) return files;

  loadingPromise = axios
    .get<ModData>(MOD_INFO_URL)
    .then(({ data }) => {
      if (!Array.isArray(data.files)) {
        throw new TypeError("模组信息格式错误：接口没有返回数组");
      }

      files.splice(0, files.length, ...data.files);
      hasLoaded = true;
      return files;
    })
    .finally(() => {
      loadingPromise = null;
    });

  return loadingPromise;
}
