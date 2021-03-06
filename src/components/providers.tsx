import React from "react"
import { useIdentityContext, SettingContext } from "../context"
import { Settings } from "react-netlify-identity"
export function Providers() {
  const setting = React.useContext(SettingContext)
  const hasProviders =
    setting &&
    setting.external &&
    Object.entries(setting.external).some(([k, v]) => ["github", "gitlab", "bitbucket", "google"].includes(k) && v)
  if (!hasProviders) return null
  return (
    <div className="providersGroup">
      <hr className="hr" />
      <ProviderButton setting={setting} provider="Google" />
      <ProviderButton setting={setting} provider="GitHub" />
      <ProviderButton setting={setting} provider="GitLab" />
      <ProviderButton setting={setting} provider="Bitbucket" />
    </div>
  )
}

interface Dict<T> {
  [id: string]: T
}
function ProviderButton({ setting, provider }: { setting: Settings | null; provider: string }) {
  if (!setting) return null
  const ext = setting.external as Dict<{}>
  if (!ext[provider.toLowerCase()]) return null
  const { loginProvider } = useIdentityContext()
  const click = () => loginProvider(provider.toLowerCase() as "github" | "gitlab" | "bitbucket" | "google")
  return (
    <button onClick={click} className={`provider${provider} btn btnProvider`}>
      Continue with {provider}
    </button>
  )
}
