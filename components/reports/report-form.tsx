"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReportSchema, ReportFormData, createReport } from "@/app/actions/reports";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Save, Loader2, Calendar, Wrench, MapPin, AlertTriangle, CheckCircle, FileText } from "lucide-react";

const statusOptions = ["Pendente", "Em Andamento", "Concluído", "Suspenso", "Arquivado"];
const priorityOptions = ["Baixa", "Normal", "Alta", "Crítica"];

const statusColors: Record<string, string> = {
  Pendente: "#eab308",
  "Em Andamento": "#3b82f6",
  Concluído: "#22c55e",
  Suspenso: "#f97316",
  Arquivado: "#6b7280",
};

const priorityColors: Record<string, string> = {
  Baixa: "#22c55e",
  Normal: "#3b82f6",
  Alta: "#f97316",
  Crítica: "#ef4444",
};

export function ReportForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ReportFormData>({
    resolver: zodResolver(ReportSchema),
    defaultValues: {
      status: "Concluído",
      priority: "Normal",
      date: new Date().toISOString().split("T")[0],
    },
  });

  const watchedStatus = watch("status");
  const watchedPriority = watch("priority");

  const onSubmit = async (data: ReportFormData) => {
    setLoading(true);
    const result = await createReport(data);
    setLoading(false);

    if (result.success) {
      toast.success("Relatório criado com sucesso!");
      router.push("/reports");
    } else {
      toast.error(result.error || "Erro ao criar relatório");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="report-form">
      {/* Row 1: Date + Equipment */}
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">
            <Calendar size={14} /> Data da Manutenção *
          </label>
          <input type="date" className={`form-input ${errors.date ? "error" : ""}`} {...register("date")} />
          {errors.date && <span className="form-error">{errors.date.message}</span>}
        </div>
        <div className="form-group">
          <label className="form-label">
            <Wrench size={14} /> Equipamento *
          </label>
          <input
            type="text"
            placeholder="Ex: Compressor AR-01, Elevador B"
            className={`form-input ${errors.equipment ? "error" : ""}`}
            {...register("equipment")}
          />
          {errors.equipment && <span className="form-error">{errors.equipment.message}</span>}
        </div>
      </div>

      {/* Row 2: Location */}
      <div className="form-group">
        <label className="form-label">
          <MapPin size={14} /> Localização
        </label>
        <input
          type="text"
          placeholder="Ex: Galpão 2, Setor Industrial, Andar 3"
          className="form-input"
          {...register("location")}
        />
      </div>

      {/* Row 3: Status + Priority */}
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">
            <CheckCircle size={14} /> Status *
          </label>
          <div className="select-wrapper">
            <select
              className="form-select"
              style={{ borderColor: `${statusColors[watchedStatus]}55`, color: statusColors[watchedStatus] }}
              {...register("status")}
            >
              {statusOptions.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">
            <AlertTriangle size={14} /> Prioridade *
          </label>
          <div className="select-wrapper">
            <select
              className="form-select"
              style={{ borderColor: `${priorityColors[watchedPriority]}55`, color: priorityColors[watchedPriority] }}
              {...register("priority")}
            >
              {priorityOptions.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Row 4: Problem */}
      <div className="form-group">
        <label className="form-label">
          <AlertTriangle size={14} /> Descrição do Problema *
        </label>
        <textarea
          rows={4}
          placeholder="Descreva detalhadamente o problema encontrado..."
          className={`form-textarea ${errors.problem ? "error" : ""}`}
          {...register("problem")}
        />
        {errors.problem && <span className="form-error">{errors.problem.message}</span>}
      </div>

      {/* Row 5: Solution */}
      <div className="form-group">
        <label className="form-label">
          <CheckCircle size={14} /> Solução Aplicada *
        </label>
        <textarea
          rows={4}
          placeholder="Descreva a solução implementada, peças substituídas, etc..."
          className={`form-textarea ${errors.solution ? "error" : ""}`}
          {...register("solution")}
        />
        {errors.solution && <span className="form-error">{errors.solution.message}</span>}
      </div>

      {/* Row 6: Notes */}
      <div className="form-group">
        <label className="form-label">
          <FileText size={14} /> Observações Adicionais
        </label>
        <textarea
          rows={3}
          placeholder="Recomendações, próxima revisão, peças necessárias..."
          className="form-textarea"
          {...register("notes")}
        />
      </div>

      {/* Submit */}
      <div className="form-actions">
        <button
          type="button"
          onClick={() => router.back()}
          className="btn-form-cancel"
        >
          Cancelar
        </button>
        <button type="submit" className="btn-form-submit" disabled={loading}>
          {loading ? (
            <>
              <Loader2 size={16} className="spin" /> Salvando...
            </>
          ) : (
            <>
              <Save size={16} /> Salvar Relatório
            </>
          )}
        </button>
      </div>
    </form>
  );
}
