
import React, { NativeModules} from 'react-native';

const { RNGoogleSpeechToText } = NativeModules;


class RCTGoogleSpeechToText {

    constructor() {
        this._loaded = false;
        this._configDone = false;
    }

    setApiKey = (apiKey) => {
        RNGoogleSpeechToText.setApiKey(apiKey);
    }

    setUpConfigFile = (languageCode, maxAlternatives) => {
        RNGoogleSpeechToText.setUpConfigFile(languageCode, maxAlternatives);
        this._configDone = true;
    }

    start = () => {

        if(!this._configDone) {
            return false;
        }
        return new Promise((resolve) => {
            RNGoogleSpeechToText.startSpeech();
            resolve();
        });
    }

    getStreamingResponse = () => {
        RNGoogleSpeechToText.getStreamingResponse((error, response) => {
            if(error)
            {
                console.error(error);
                return false;
            } else {
                return response;
            }
        })
    }

    stop = () => {
        return new Promise((resolve, reject) => {
            RNGoogleSpeechToText.stopSpeech((error) => {
                if (error) {
                    reject(new Error(error));
                } else {
                    resolve();
                }
            });
        });
    }

}

export default RCTGoogleSpeechToText;
