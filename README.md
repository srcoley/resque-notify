A Resque plugin that sends desktop notification if a job fails.

## How to Use

### Install
`gem "resque-notify"`

### Require
`require 'resque-notify/server'`

### Poll
1. Open the Resque web view
1. Make sure you're on the overview page
1. Click "Live Poll"
1. Wait for failed jobs

## Q&A

<dl>
  <dt>Why am I not being notified?</dt>
  <dd>Probably because you don't have the Overview page open on the Resque web view, or you haven't clicked "Live Poll" yet</dd>
  
  <dt>How does this work?</dt>
  <dd>Resque Notify adds a second view directory to the Sinatra app that Resque uses to create a web view. This directory contains a copy of layout.erb. The only difference between this layout file and the default one is that it includes the notify script. This plugin also overrides the Resque::Server#show method so that the default layout is the layout with the notify script.</dd>
</dl>
