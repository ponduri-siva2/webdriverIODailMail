import { Given, When, Then } from '@wdio/cucumber-framework';
import { browser, $, $$ } from '@wdio/globals';
import {expect} from 'chai';

import HomePage from '../pageobjects/dailmail.home.page';

const pages = {
    video : HomePage
}
let currentData;
// let playButton;
// let forwardButton;
// let backwardButton;
// let volumeButton;

Given(/^I am on the Daily Mail (\w+) page$/, async (page) => {
  await pages[page].open()
});

Given('I accept cookies',  async () => {
    const cookiesConsentPresent = await $('.primary_2xk2l');
  
    if (cookiesConsentPresent) {
      // Click the cookies consent element to accept cookies
      await cookiesConsentPresent.click();
      browser.pause(10000);
      console.log('Cookies consent element accepted.');
    } else {
      console.log('Cookies consent element not found, no action needed.');
    }
    // playButton = await $('.vjs-control-bar .vjs-play-control');
    // forwardButton = await $('.vjs-control-bar .mol-skip-control');
    // backwardButton = await $('.vjs-control-bar .mol-previous-control')
    // volumeButton = await $('div.vjs-control-bar>[role="button"][class*="vjs-vol-"]')
});

When('I click on Video in page to begin playback', async() => {
  await HomePage.playButton.waitForClickable({ timeout: 10000 });
  await HomePage.playButton.click();
});

Then('the video should be playing', async() => {
  // const videoButton = await HomePage.playButton;
  await HomePage.playButton.waitUntil(async () => {
    const classes = await HomePage.playButton.getAttribute('class');
    return classes.includes('vjs-playing');
  }, {
    timeout: 10000, // Adjust the timeout as needed
    timeoutMsg: 'Expected class "vjs-playing" not found after clicking play button',
  });
  const classAttributeValue = await HomePage.playButton.getAttribute('class');
  expect(classAttributeValue).to.include('vjs-playing');
});

When('I click the video again to pause playback', async() => {
  // await $('div.video-ad-label.vjs-control').waitForExist({ reverse: true});
  await HomePage.playButton.waitForClickable({ timeout: 10000 });
  await HomePage.playButton.click();
});

Then('the video should be paused', async() => {
  await HomePage.playButton.waitUntil(async () => {
    const classes = await HomePage.playButton.getAttribute('class');
    return classes.includes('vjs-paused');
  }, {
    timeout: 10000,
    timeoutMsg: 'Expected class "vjs-paused" not found after clicking play button',
  });
    const classAttributeValue = await HomePage.playButton.getAttribute('class');
    expect(classAttributeValue).to.include('vjs-paused');
});

When('I click on the forward arrow to change to the next video', async() => {
  const poster = await HomePage.mainVideo;
  currentData = await poster.getAttribute('poster');
  await $('div.video-ad-label.vjs-control').waitForDisplayed({ reverse: true, timeout: 60000});
  await HomePage.forwardButton.waitForClickable({ timeout: 3000 });
  await HomePage.forwardButton.click();
});

Then('the next video should start playing', async() => {
  await $('div.video-ad-label.vjs-control').waitForDisplayed({ reverse: true, timeout: 60000});
  await HomePage.mainVideo.waitUntil(async () => {
    const currentPoster = await HomePage.playButton.getAttribute('poster');
    return currentData !== currentPoster;
  }, {
    timeout: 10000,
    timeoutMsg: 'Expected next video not playing after clicking forward button',
  });
  const poster = await HomePage.mainVideo;
  const currentPoster = await poster.getAttribute('poster');
  expect(currentData).to.not.equal(currentPoster);
});

When('I click on the back arrow to navigate to the previous video', async() => {
  browser.pause(5000);
  await $('div.video-ad-label.vjs-control').waitForDisplayed({ reverse: true, timeout: 60000});
  await HomePage.backwardButton.waitForClickable({ timeout: 60000 });
  await HomePage.backwardButton.click();
});

Then('the previous video should start playing', async() => {
  await HomePage.backwardButton.waitForClickable({ timeout: 60000 });
  const poster = await HomePage.mainVideo;
  let currentPoster = await poster.getAttribute('poster');
});

When('I click on the speaker icon to mute the video', async() => {
  await HomePage.volumeButton.waitForClickable({ timeout: 10000 });
  await HomePage.volumeButton.click();
  await browser.execute(() => {
    const body = document.body;
    body.focus();
  });
});

Then('the video should be muted', async() => {
  const classAttributeValue = await HomePage.volumeButton.getAttribute('class');
  expect(classAttributeValue).to.include('vjs-vol-0');
});

When('I click on the speaker icon again to unmute the video', async() => {
  // await $('div.vjs-control-bar>.vjs-volume-menu-button.vjs-menu-button.vjs-control.vjs-vol-0').waitForClickable({ timeout: 10000 });
  // await $('div.vjs-control-bar>.vjs-volume-menu-button.vjs-menu-button.vjs-control.vjs-vol-0').click();
  await HomePage.volumeButton.waitForClickable({ timeout: 10000 });

  const classAttributeValue = await HomePage.volumeButton.getAttribute('class');
  if (classAttributeValue.includes('vjs-vol-0')) {
    // Only click to unmute if it's currently muted
    alert();
  }
});

Then('the video should be unmuted', async() => {
  await HomePage.volumeButton.waitUntil(async () => {
    const classes = await HomePage.volumeButton.getAttribute('class');
    return !classes.includes('vjs-vol-0');
  }, {
    timeout: 60000,
    timeoutMsg: 'Expected Video not unmute after clicking volume button',
  });
  const classAttributeValue = await HomePage.volumeButton.getAttribute('class');
  expect(classAttributeValue).to.not.include('vjs-vol-0');
});

When('I wait for the video to finish', () => {
});

Then('the next video should autoplay', () => {
  browser.pause(10000);
});


