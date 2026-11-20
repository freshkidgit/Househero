import { NextResponse } from 'next/server';
import { saveQuote } from '@/lib/db';
import { calculateMultiServiceBundle, calculateServicePrice } from '@/data/pricingEngine';
import { SERVICES } from '@/data/services';

export async function POST(request: Request) {
  try {
    const { services: rawServices, zipCode } = await request.json();

    if (!Array.isArray(rawServices) || rawServices.length === 0) {
      return NextResponse.json({ success: false, error: 'Select at least one service for an estimate' }, { status: 400 });
    }

    const verifiedServices = [];
    const bundleItemsForCalc = [];

    for (const item of rawServices) {
      const sId = typeof item === 'string' ? item : item.serviceId;
      const cfg = typeof item === 'object' && item.config ? item.config : {};
      const serviceMeta = SERVICES.find((s) => s.id === sId);
      const title = serviceMeta ? serviceMeta.title : sId;

      const calc = calculateServicePrice(sId, cfg);
      const itemSubtotal = calc.subtotal > 0 ? calc.subtotal : (serviceMeta?.startingPrice || 120);

      verifiedServices.push({
        serviceId: sId,
        serviceTitle: title,
        subtotal: itemSubtotal,
        config: cfg
      });

      bundleItemsForCalc.push({
        serviceId: sId,
        config: cfg
      });
    }

    const bundleResult = calculateMultiServiceBundle(bundleItemsForCalc);

    const saved = await saveQuote({
      services: verifiedServices,
      subtotalUSD: bundleResult.combinedSubtotal,
      discountUSD: bundleResult.bundleDiscountAmount,
      totalUSD: bundleResult.finalTotal,
      zipCode: zipCode || '80202'
    });

    return NextResponse.json({
      success: true,
      quote: saved
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to save quote estimate' }, { status: 500 });
  }
}
