// composables/usePublicUrl.ts
export function usePublicUrl(path: string) {
  const { app } = useRuntimeConfig()
  // 确保 baseURL 末尾有 /，path 开头无 /
  const base = app.baseURL.replace(/\/$/, '')
  console.log("base"+base)
  const cleanPath = path.replace(/^\//, '')
   console.log("cleanPath"+cleanPath)
//   return `${base}/${cleanPath}`
  return `/${cleanPath}`
}