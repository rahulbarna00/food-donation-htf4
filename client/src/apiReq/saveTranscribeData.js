'use client';
import checkUserAuthClient from '@/auth/getUserSession'
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from 'uuid';
const saveATranscribeData = async (formdata) => {
  const uuidForAudio = uuidv4()
  const { data: session } = await checkUserAuthClient()
  console.log(session)
  let emailID = session.session.user.email
  let userEmail = emailID.substring(0, emailID.indexOf('@'))
  var randomValue = Math.floor(Math.random() * 90000) + 10000;
  const supabaseurl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const supabase = createClient(supabaseurl, supabaseAnonKey)
  const result = await supabase.storage.from('votum-transcribe-audio-file').upload(`${uuidForAudio}.mp3`, formdata.file, {
    cacheControl: "3600"
  });
  console.log(result)
  if (result?.error?.message) {
    return result
  } else {

    const { data, error } = await supabase
      .from('transcripts')
      .insert([
        { text: formdata.repsonseText, audio_uuid:  uuidForAudio, user_uuid :session.session.user.id  },
      ])
      .select()

      console.log(data)
      console.log(error)

    return result
  }
}
export default saveATranscribeData



// const tus = require('tus-js-client')

// const saveATranscribeData = async ({file,repsonseText}) => {
//   const bucketName = 'votum-transcribe-audio-file'
//   const fileName ="audiosample.mp3"
//   const supabaseurl = process.env.NEXT_PUBLIC_SUPABASE_URL
//   const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
//   console.log(supabaseurl)
//   console.log(supabaseAnonKey)
//   const { data: session } = await clientConnectionWithSupabase()
//   console.log(session)

//   return new Promise((resolve, reject) => {
//     var upload = new tus.Upload(file, {
//       endpoint: `${supabaseurl}/storage/v1/upload/resumable`,
//       retryDelays: [0, 3000, 5000, 10000, 20000],
//       headers: {
//         authorization: `Bearer ${supabaseAnonKey}`,
//         'x-upsert': 'true', // optionally set upsert to true to overwrite existing files
//       },
//       uploadDataDuringCreation: true,
//       // removeFingerprintOnSuccess: true, // Important if you want to allow re-uploading the same file https://github.com/tus/tus-js-client/blob/main/docs/api.md#removefingerprintonsuccess
//       metadata: {
//         bucketName: bucketName,
//         objectName: fileName,
//         contentType: 'audio/mpeg',
//         cacheControl: 3600,
//       },
//       chunkSize: 6 * 1024 * 1024, // NOTE: it must be set to 6MB (for now) do not change it
//       onError: function (error) {
//         console.log('Failed because: ' + error)
//         reject(error)
//       },
//       // onProgress: function (bytesUploaded, bytesTotal) {
//       //   var percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2)
//       //   console.log(bytesUploaded, bytesTotal, percentage + '%')
//       // },
//       onSuccess: function () {
//         console.log('Download %s from %s', upload.file.name, upload.url)
//         resolve()
//       },
//     })


//     // Check if there are any previous uploads to continue.
//     return upload.findPreviousUploads().then(function (previousUploads) {
//       // Found previous uploads so we select the first one.
//       if (previousUploads.length) {
//         upload.resumeFromPreviousUpload(previousUploads[0])
//       }

//       // Start the upload
//       upload.start()
//     })
//   })
// }

// export default saveATranscribeData
