"use client";

import * as Y from "yjs";
import { Button } from "./ui/button";
import { FormEvent, useState, useTransition } from "react";
import { BotIcon, LanguagesIcon } from "lucide-react";
import { toast } from "sonner";
import Markdown from "react-markdown";
import preprocessText from "@/lib/preprocessText";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Language =
  | "english"
  | "spanish"
  | "french"
  | "german"
  | "italian"
  | "portuguese"
  | "russian"
  | "chinese"
  | "japanese"
  | "korean"
  | "vietnamese"
  | "dutch"
  | "polish"
  | "ukrainian"
  | "czech"
  | "danish"
  | "finnish"
  | "greek"
  | "hungarian"
  | "norwegian"
  | "swedish"
  | "hindi"
  | "bengali"
  | "marathi"
  | "telugu"
  | "thai"
  | "lao"
  | "kannada"
  | "sanskrit";

const languages: Language[] = [
  "english",
  "french",
  "german",
  "italian",
  "portuguese",
  "russian",
  "chinese",
  "japanese",
  "korean",
  "vietnamese",
  "dutch",
  "polish",
  "spanish",
  "ukrainian",
  "czech",
  "danish",
  "finnish",
  "greek",
  "hungarian",
  "norwegian",
  "swedish",
  "hindi",
  "bengali",
  "marathi",
  "telugu",
  "thai",
  "lao",
  "kannada",
  "sanskrit",
];

export default function TranslateDocument({ doc }: { doc: Y.Doc }) {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState<string>("");
  const [summary, setSummary] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleAskQuestion = async (e: FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      const documentData = preprocessText(doc.get("document-store").toJSON());
      //console.log(documentData, doc.get("document-store").toJSON());

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/translateDocument`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ documentData, targetLang: language }),
        }
      );

      if (res.ok) {
        const { translated_text } = await res.json();

        setSummary(translated_text);
        toast.success("Document summary translated successfully!");
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button asChild variant="outline">
        <DialogTrigger>
          <LanguagesIcon />
          Translate
        </DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">
            Translate the Document
          </DialogTitle>
          <hr />
          <DialogDescription>
            Select a language to get the AI enabled summary of the document in
            the selected language.
          </DialogDescription>

          <hr className="mt-5" />
        </DialogHeader>

        {summary && (
          <div className="flex flex-col items-start max-h-96 overflow-y-scroll gap-2 p-5 bg-gray-100">
            <div className="flex">
              <BotIcon className="w-10 flex-shrink-0" />
              <p className="font-bold">
                GPT {isPending ? "is thinking..." : "says:"}
              </p>
            </div>
            <div>
              {isPending ? <p>Thinking...</p> : <Markdown>{summary}</Markdown>}
            </div>
          </div>
        )}

        <form className="flex gap-2" onSubmit={handleAskQuestion}>
          <Select
            value={language}
            onValueChange={(value) => setLanguage(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>
              {languages.sort().map((lang) => (
                <SelectItem key={lang} value={lang}>
                  {lang.charAt(0).toUpperCase() + lang.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button type="submit" disabled={!language || isPending}>
            {isPending ? "Translating..." : "Translate"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
