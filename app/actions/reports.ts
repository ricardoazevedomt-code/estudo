import { prisma } from '@/lib/prisma';
import { MaintenanceReport, User } from '@prisma/client';
import { z } from 'zod';

// Input validation schemas
export const CreateReportSchema = z.object({
  date: z.string().refine((d) => !isNaN(Date.parse(d)), { message: 'Invalid date' }),
  equipment: z.string().min(1),
  location: z.string().optional(),
  problem: z.string().min(1),
  solution: z.string().optional(),
  status: z.enum(['Pendente', 'Em Andamento', 'Concluído', 'Suspenso', 'Arquivado']).default('Concluído'),
  priority: z.enum(['Baixa', 'Normal', 'Alta']).default('Normal'),
  notes: z.string().optional(),
  userId: z.string().uuid(),
});

export const UpdateReportSchema = CreateReportSchema.partial();

/**
 * Create a new maintenance report.
 */
export async function createReport(data: z.infer<typeof CreateReportSchema>) {
  const parsed = CreateReportSchema.parse(data);
  return await prisma.maintenanceReport.create({ data: { ...parsed, date: new Date(parsed.date) } });
}

/**
 * Get all reports (visible to all users per requirement).
 */
export async function getReports() {
  return await prisma.maintenanceReport.findMany({ include: { user: { select: { name: true, email: true } } } });
}

/**
 * Update an existing report.
 */
export async function updateReport(id: string, data: z.infer<typeof UpdateReportSchema>) {
  const parsed = UpdateReportSchema.parse(data);
  if (parsed.date) parsed.date = new Date(parsed.date) as any;
  return await prisma.maintenanceReport.update({ where: { id }, data: parsed });
}

/**
 * Delete a report.
 */
export async function deleteReport(id: string) {
  return await prisma.maintenanceReport.delete({ where: { id } });
}

// Dashboard statistics used by the dashboard page
export async function getDashboardStats() {
  const total = await prisma.maintenanceReport.count();
  const byStatus = await prisma.maintenanceReport.groupBy({
    by: ['status'],
    _count: true,
  });
  const recent = await prisma.maintenanceReport.findMany({
    orderBy: { date: 'desc' },
    take: 5,
    include: { user: { select: { name: true, email: true } } },
  });
  return { total, byStatus, recent };
}

