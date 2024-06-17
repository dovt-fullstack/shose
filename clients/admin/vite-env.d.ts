/// <reference types="vite/client" />

declare module 'vite' {
  interface ImportMetaEnv {
    VITE_API: string
    // add other environment variables here
  }
}