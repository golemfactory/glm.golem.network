import { useTheme } from 'components/providers/ThemeProvider'
import { GolemCenterLogo } from './GolemCenteredLogo'
import style from './LandingPage.module.css'
import { useEffect, useState } from 'react'
import { useDebounce } from 'usehooks-ts'
import { Button, Trans } from 'components/atoms'
import { VideoSection } from './Video.section'
import { UseCaseSection } from './UseCase.section'
import { APISection } from './API.section'
import { RunSection } from './Run.section'
import { WhatYouNeedSection } from './WhatYouNeed.section'

const SectionSeparator = () => {
  return <div className={style.sectionSeparator} />
}

const LandingPageContent = () => {
  const [scroll, setScroll] = useState(0)

  const debouncedScroll = useDebounce(scroll, 1)

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <div className={style.centeredContent}>
        <div
          style={{
            position: 'absolute',
            top: Math.min(Math.max(0, 2 * debouncedScroll), 500) + 'px',
          }}
        >
          <div className={`${style.title} text-center`}>
            <Trans i18nKey="title" ns="landing" />
          </div>
          <div className={`${style.subtitle} text-center mt-4 mb-14`}>
            <Trans i18nKey="subtitle" ns="landing" />
          </div>
          <div className="text-center mb-8 ">
            <Button buttonStyle="solid" className="py-4 px-9">
              <Trans i18nKey="getGLM" ns="landing" />
            </Button>
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            top: Math.max(-200, 540 - debouncedScroll),
          }}
        >
          <GolemCenterLogo />
        </div>
      </div>
      <VideoSection />
      <SectionSeparator />
      <UseCaseSection />
      <SectionSeparator />
      <APISection />
      <SectionSeparator />
      <RunSection />
      <SectionSeparator />
      <WhatYouNeedSection />
    </>
  )
}

export const LandingPage = () => {
  const theme = useTheme()
  const LayoutTemplate = theme.getLayoutTemplate()
  return (
    <LayoutTemplate
      header={<button> get GLM</button>}
      main={<LandingPageContent />}
    />
  )
}
