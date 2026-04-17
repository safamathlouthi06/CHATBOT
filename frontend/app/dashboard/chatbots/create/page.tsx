"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateChatbotPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    nom: "",
    domaine: "",
    statut: "actif",
    description: "",
    role: "Support Client",
    tone: "Professionnel",
    example: "Bonjour ! En quoi puis-je vous être utile ?",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await fetch("http://127.0.0.1:8000/chatbot/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nom: form.nom,
          domaine: form.domaine,
          statut: form.statut,
        }),
      });

      const data = await res.json();

      console.log("CHATBOT CREATED:", data);

      if (!res.ok) {
        throw new Error(data?.detail || "Erreur création chatbot");
      }

      // ✅ SUCCESS → redirect liste
      router.push("/dashboard/chatbots");

    } catch (error) {
      console.error("ERROR:", error);
      alert("Erreur lors de la création du chatbot");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-6">

        <h1 className="text-2xl font-bold mb-2">
          Créer un nouveau chatbot
        </h1>
        <p className="text-gray-500 mb-6">
          Configurez votre assistant conversationnel
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Nom */}
          <div>
            <label className="block font-medium mb-1">Nom *</label>
            <input
              type="text"
              name="nom"
              value={form.nom}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 bg-gray-50"
              required
            />
          </div>

          {/* Domaine */}
          <div>
            <label className="block font-medium mb-1">Domaine *</label>
            <input
              type="text"
              name="domaine"
              value={form.domaine}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 bg-gray-50"
              required
            />
          </div>

          {/* Rôle */}
          <div>
            <label className="block font-medium mb-1">Rôle</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 bg-gray-50"
            >
              <option>Support Client</option>
              <option>Assistant Commercial</option>
              <option>Coach</option>
            </select>
          </div>

          {/* Ton */}
          <div>
            <label className="block font-medium mb-1">Ton</label>
            <select
              name="tone"
              value={form.tone}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 bg-gray-50"
            >
              <option>Professionnel</option>
              <option>Amical</option>
              <option>Fun</option>
            </select>
          </div>

          {/* Exemple */}
          <div>
            <label className="block font-medium mb-1">Exemple</label>
            <textarea
              name="example"
              value={form.example}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 bg-gray-50"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 rounded-lg border"
            >
              Annuler
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 bg-black text-white rounded-lg hover:opacity-90"
            >
              {loading ? "Création..." : "Créer le chatbot"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}