import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Global } from "@emotion/core"

import "../css/site.css"
import Reset from "../components/jss/Reset"
import HomePage from "./HomePage"
import Layout from "../components/layout"

import Amplify from "aws-amplify"
import awsconfig from "../aws-exports"
Amplify.configure(awsconfig)

import ErrorBoundary from "../components/ErrorBoundary"

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query MyQuery {
      allVolunteersJson {
        nodes {
          volunteers {
            profLink
            firstName
            lastName
            profImage
          }
        }
      }
      allSponsersJson {
        nodes {
          sponsers {
            brands {
              sponserName
              webLink
              webLogo
            }
            tierName
          }
        }
      }
      allAgendaJson {
        nodes {
          slots {
            eventType
            img
            slotId
            timeEnd
            timeStart
            slotFeedBack
            tracks {
              feedBack
              selectedFlag
              speakers {
                designation
                externalLink
                firstName
                lastName
                profilePicture
              }
              title
              trackId
              trackLength
            }
          }
        }
      }
    }
  `)

  function SetLocalStorage(key, value) {
    // Donot remove "typeof" : https://github.com/gatsbyjs/gatsby/issues/14480#issuecomment-497983196
    if (typeof window !== "undefined" && localStorage.getItem(key) === null) {
      localStorage.setItem(key, JSON.stringify(value))
    }
  }

  const { slots } = data.allAgendaJson.nodes[0]
  const { volunteers } = data.allVolunteersJson.nodes[0]
  const { sponsers } = data.allSponsersJson.nodes[0]
  const user = { email: "" }

  SetLocalStorage("slots", slots)
  SetLocalStorage("volunteers", volunteers)
  SetLocalStorage("sponsers", sponsers)
  SetLocalStorage("user", user)
  SetLocalStorage("user", user)
  SetLocalStorage("feedback", {})

  return (
    <ErrorBoundary>
      <Layout location={location}>
        <Global styles={Reset} />
        <HomePage />
      </Layout>
    </ErrorBoundary>
  )
}

export default IndexPage
