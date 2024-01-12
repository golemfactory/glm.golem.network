import { FC } from 'react'
import { LayoutPropsType } from 'types/ui'

import style from './Layout.module.css'
import { GolemLogoWithDescription } from 'components/atoms/icons/GolemLogoWithDescription'
import { Grid } from 'components/organisms/grid/Grid'
import { Button } from 'components/atoms/button'
import { Trans } from 'components/atoms/translation'

const Ellipses = () => {
  return (
    <div>
      {/* <div className={style.ellipse_1}></div>
      <div className={style.ellipse_2}></div>
      <div className={style.ellipse_3}></div> */}
    </div>
  )
}

export const LayoutTemplate: FC<LayoutPropsType> = ({ main }) => {
  return (
    <main>
      <Grid className="mt-10 ">
        <Ellipses />
        <div className="col-span-12 grid grid-cols-12">
          <div className="xl:col-span-2 col-span-4">
            <GolemLogoWithDescription />
          </div>
          <div className="col-span-5 xl:col-span-8"></div>
          <div className="col-span-3 xl:col-span-2">
            <Button buttonStyle="solid" className="md:py-4 md:px-9 py-2 px-5">
              <Trans i18nKey="getGLM" ns="landing" />
            </Button>
          </div>
        </div>
        {main}
      </Grid>
    </main>
  )
}
