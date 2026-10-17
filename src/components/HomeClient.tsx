'use client'

import React, { useState, createContext, useContext, useMemo, useCallback } from 'react'
import RouteSwitch from './layers/RouteSwitch'
import AnimatedBackground from './AnimatedBackground'
import NemoBackground from './NemoBackground'
import CustomCursor from './Cursor'
import SplashScreen from './SplashScreen'
import PortfolioIntro from './PortfolioIntro'
import { IntroStage } from '../types'

export interface SplashContextType {
  splashDone: boolean
}

export const SplashContext = createContext<SplashContextType>({ splashDone: true })
export const useSplash = () => useContext(SplashContext)

interface HomeClientProps {
  children: React.ReactNode
}

export default function HomeClient({ children }: HomeClientProps) {
  const [splashDone, setSplashDone] = useState(false)
  const [introStage, setIntroStage] = useState<IntroStage>('idle')

  const handleFadeStart = useCallback(() => {
    setSplashDone(true)
    setIntroStage('entering')
  }, [])

  const handleSplashFinished = useCallback(() => {
    setSplashDone(true)
  }, [])

  const contextValue = useMemo(() => ({ splashDone }), [splashDone])

  return (
    <SplashContext.Provider value={contextValue}>
      <main>
        {!splashDone && (
          <SplashScreen
            onFadeStart={handleFadeStart}
            onFinished={handleSplashFinished}
          />
        )}

        {splashDone && (
          <PortfolioIntro onIntroStageChange={setIntroStage} />
        )}

        {/* Global animated background layers */}
        <AnimatedBackground />
        <NemoBackground />
        <CustomCursor />

        <div className="content">
          {children}
          {splashDone && <RouteSwitch introStage={introStage} />}
        </div>
      </main>
    </SplashContext.Provider>
  )
}
