'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'

export default function ImageUploadForm() {
    const supabase = createClient()

    const [file, setFile] = useState(null)
    const [uploading, setUploading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!file) return alert('Seleziona un file!')

        try {
            setUploading(true)

            // 1. Nome file unico per evitare sovrascritture
            const fileExt = file.name.split('.').pop()
            const fileName = `${Date.now()}.${fileExt}`
            const filePath = `uploads/${fileName}`

            // 2. Upload nel Bucket Supabase (es. 'images')
            const { error: uploadError } = await supabase.storage
                .from('bench-images')
                .upload(filePath, file)

            if (uploadError) throw uploadError

            // 3. Recupera l'URL pubblico del file
            const { data: urlData } = supabase.storage
                .from('bench-images')
                .getPublicUrl(filePath)

            const publicUrl = urlData.publicUrl

            // 4. Inserimento record nella tabella del DB (es. 'posts')
            const { error: dbError } = await supabase
                .from('projects')
                .insert([{ cover_img: publicUrl }])

            if (dbError) throw dbError

            alert('Immagine salvata con successo!')
        } catch (error: any) {
            alert(error.message)
        } finally {
            setUploading(false)
        }
    }

    return (

        setFile(e.target.files?.[0] || null)}
      />

{ uploading ? 'Caricamento in corso...' : 'Invia' }
      
    
  )
}