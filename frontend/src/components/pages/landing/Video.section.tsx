import videoSectionStyle from './Video.section.module.css'
import landingPageStyle from './LandingPage.module.css'
import { Trans } from 'components/atoms'
import { Bullet } from 'components/atoms/bullet/Bullet'
import { AnimatedSection } from './animatedSection'

const style = {
  ...videoSectionStyle,
  ...landingPageStyle,
}

export const VideoSection = () => {
  return (
    <AnimatedSection>
      <div className={style.bulletContainer}>
        <Bullet />
      </div>
      <div className={style.videoTextContainer}>
        <div className={style.videoTitle}>
          <Trans i18nKey="videoTitle" ns="landing" />
        </div>
        <div className={style.videoDescription}>
          <Trans i18nKey="videoDescription" ns="landing" />
        </div>
      </div>
      <video className={style.video} controls>
        <source
          src="https://www.youtube.com/watch?v=FZb_w5JXvJ8"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </AnimatedSection>
  )
}
