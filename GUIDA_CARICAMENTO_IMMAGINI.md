# Guida al Caricamento delle Immagini con Supabase Storage

Questa guida spiega passo dopo passo come è stato implementato il caricamento dell'immagine di copertina per i progetti nell'applicazione, collegando il frontend (React & React Hook Form) a **Supabase Storage** e al database.

---

## Flusso Logico di Funzionamento

Il caricamento delle immagini segue questo flusso lineare:

```
[Seleziona file nel Form] --> [Submit del Form]
         |
         v
  { C'è un'immagine? }
   /              \
 (Sì)             (No)
  /                  \
 v                    v
[Genera nome unico]   [Inserisci nel DB con cover_img = null]
  |                    |
  v                    v
[Carica su Storage]  [Chiudi modale e aggiorna dati]
  |
  v
[Ottieni URL pubblico]
  |
  v
[Inserisci nel DB con URL]
  |
  v
[Chiudi modale e aggiorna dati]
```

---

## 1. Configurazione del Form (Frontend)

Nel file del form ([ModalFormCreate.tsx](file:///Users/boso1999/Desktop/Progetti/bench/src/components/ModalFormCreate.tsx)), viene definito un input di tipo `file`:

- **Tipizzazione**:
  L'immagine viene catturata come una lista di file (`FileList`) generata dal browser:
  ```typescript
  type FormInputs = {
      title: string;
      description: string;
      state: "non iniziato" | "iniziato" | "completato";
      image: FileList; // Cattura i file selezionati dall'utente
  }
  ```

- **Input HTML**:
  L'input accetta solo immagini ed è registrato tramite `react-hook-form`:
  ```tsx
  <input
      type="file"
      accept="image/*"
      {...register("image")}
      className="..."
  />
  ```

---

## 2. Processo di Caricamento (Submit Handler)

Quando l'utente preme "Salva", viene avviata la funzione `onSubmit`. Se è presente un file selezionato, viene eseguito il caricamento:

### A. Estrazione del file e generazione del nome univoco
Evitiamo collisioni di nomi (ad esempio se due utenti caricano un file chiamato `foto.jpg`) generando un nome randomico unito alla marca temporale corrente:
```typescript
const file = data.image[0]; // Estrae il primo file selezionato
const fileExt = file.name.split('.').pop(); // Ottiene l'estensione (es. 'png', 'jpg')
const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`; // Nome univoco
const filePath = `${fileName}`;
```

### B. Caricamento nel Bucket Supabase
Il client Supabase invia il file al bucket denominato **`projects-image`**:
```typescript
const { data: uploadData, error: uploadError } = await supabase.storage
    .from("projects-image")
    .upload(filePath, file);
```

### C. Generazione dell'URL pubblico
Subito dopo il caricamento, chiediamo a Supabase l'indirizzo web pubblico per raggiungere quell'immagine:
```typescript
const { data: { publicUrl } } = supabase.storage
    .from("projects-image")
    .getPublicUrl(filePath);

coverImgUrl = publicUrl; // Salviamo questo indirizzo
```

---

## 3. Inserimento nel Database

Infine, inviamo tutti i dati del form alla tabella `projects` del database, inserendo l'URL dell'immagine appena ottenuto all'interno della colonna **`cover_img`**:

```typescript
const { error } = await supabase.from("projects").insert({
    title: data.title,
    description: data.description,
    state: data.state,
    cover_img: coverImgUrl || null, // Se non c'è immagine inserisce NULL
});
```

---

## 4. Requisiti di Configurazione su Supabase

Affinché questo codice funzioni senza errori, sul pannello di controllo del tuo progetto Supabase devono essere configurate due cose:

### A. Creazione del Bucket di Storage
1. Vai su **Storage** nel menu di sinistra.
2. Crea un nuovo Bucket chiamato **`projects-image`**.
3. Assicurati di impostarlo come **Public** (così chiunque potrà visualizzare le immagini caricate).

### B. Abilitazione delle regole di scrittura (Policy RLS)
Esegui questi comandi SQL nel **SQL Editor** di Supabase per consentire al tuo sito web di scrivere i dati e caricare i file:

```sql
-- Consenti a tutti di caricare file nel bucket 'projects-image'
CREATE POLICY "Consenti caricamento pubblico" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'projects-image');

-- Consenti a tutti di inserire nuovi progetti nel database
CREATE POLICY "Consenti inserimento pubblico" ON public.projects
FOR INSERT WITH CHECK (true);
```
