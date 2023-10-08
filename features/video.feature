# Feature: Daily Mail Video Playback

#     Scenario: Verify video player functionality
#         Given I am on the Daily Mail video page
#         And I accept cookies
#         When I click on Video in page to begin playback
#         When I click the video again to pause playback
#         When I click on the forward arrow to change to the next video
#         When I click on the back arrow to navigate to the previous video
#         When I click on the speaker icon to mute the video
#         When I click on the speaker icon again to unmute the video
#         Then the next video should autoplay
Feature: Daily Mail Video Playback

    Background:
        Given I am on the Daily Mail video page
        And I accept cookies

    Scenario: Verify video player functionality
        When I click on Video in page to begin playback
        Then the video should be playing
        When I click the video again to pause playback
        Then the video should be paused
        When I click on the forward arrow to change to the next video
        Then the next video should start playing
        When I click on the back arrow to navigate to the previous video
        Then the previous video should start playing
        When I click on the speaker icon to mute the video
        Then the video should be muted
        When I click on the speaker icon again to unmute the video
        Then the video should be unmuted
        When I wait for the video to finish
        Then the next video should autoplay

