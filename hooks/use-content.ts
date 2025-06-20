"use client"

import { useState, useEffect } from "react"
import { aboutContent } from "@/lib/about-content"
import { storiesContent } from "@/lib/stories-content"
import { homeContent } from "@/lib/home-content"
import { contactContent } from "@/lib/contact-content"
import { novelsContent } from "@/lib/novels-content"

export function useHomeContent() {
  const [content, setContent] = useState<any>(null)
  useEffect(() => { setContent(homeContent) }, [])
  return { content, loading: false, error: null }
}

export function useAboutContent() {
  const [content, setContent] = useState<any>(null)
  useEffect(() => { setContent(aboutContent) }, [])
  return { content, loading: false, error: null }
}

export function useStoriesContent() {
  const [stories, setStories] = useState<any[]>([])
  useEffect(() => { setStories(storiesContent.stories) }, [])
  return { stories, loading: false, error: null }
}

export function useContactContent() {
  const [content, setContent] = useState<any>(null)
  useEffect(() => { setContent(contactContent) }, [])
  return { content, loading: false, error: null }
}

export function useNovelsContent() {
  const [novels, setNovels] = useState<any[]>([])
  const [stats, setStats] = useState<any>(novelsContent.stats)
  useEffect(() => {
    setNovels(novelsContent.novels)
    setStats(novelsContent.stats)
  }, [])
  return { novels, stats, loading: false, error: null }
}
