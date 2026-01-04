'use client';

import { BlockEditorProps, BlockRenderProps } from '@/types/block';
import { CompanyCardProps } from '@/lib/schemas/company';

export function CompanyCardBlockEditor({ block, onChange, locale }: BlockEditorProps) {
  const props = block.props as CompanyCardProps;

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Company Name</label>
        <input
          type="text"
          value={props.name || ''}
          onChange={(e) => onChange({ ...props, name: e.target.value })}
          className="w-full p-2 border rounded"
          placeholder="Company Name"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea
          value={props.description || ''}
          onChange={(e) => onChange({ ...props, description: e.target.value })}
          className="w-full p-2 border rounded"
          rows={3}
          placeholder="Company description..."
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Website URL</label>
        <input
          type="text"
          value={props.url || ''}
          onChange={(e) => onChange({ ...props, url: e.target.value })}
          className="w-full p-2 border rounded"
          placeholder="https://example.com"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Logo URL</label>
        <input
          type="text"
          value={props.logo || ''}
          onChange={(e) => onChange({ ...props, logo: e.target.value })}
          className="w-full p-2 border rounded"
          placeholder="https://example.com/logo.png"
        />
      </div>
      <div className="border-t pt-4">
        <h4 className="font-medium mb-2">Address</h4>
        <div className="space-y-2">
          <input
            type="text"
            value={props.address?.streetAddress || ''}
            onChange={(e) => onChange({
              ...props,
              address: { ...props.address, streetAddress: e.target.value },
            })}
            className="w-full p-2 border rounded"
            placeholder="Street Address"
          />
          <input
            type="text"
            value={props.address?.addressLocality || ''}
            onChange={(e) => onChange({
              ...props,
              address: { ...props.address, addressLocality: e.target.value },
            })}
            className="w-full p-2 border rounded"
            placeholder="City"
          />
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              value={props.address?.postalCode || ''}
              onChange={(e) => onChange({
                ...props,
                address: { ...props.address, postalCode: e.target.value },
              })}
              className="w-full p-2 border rounded"
              placeholder="Postal Code"
            />
            <input
              type="text"
              value={props.address?.addressCountry || ''}
              onChange={(e) => onChange({
                ...props,
                address: { ...props.address, addressCountry: e.target.value },
              })}
              className="w-full p-2 border rounded"
              placeholder="Country"
            />
          </div>
        </div>
      </div>
      <div className="border-t pt-4">
        <h4 className="font-medium mb-2">Contact</h4>
        <div className="space-y-2">
          <input
            type="text"
            value={props.contactPoint?.telephone || ''}
            onChange={(e) => onChange({
              ...props,
              contactPoint: { ...props.contactPoint, telephone: e.target.value },
            })}
            className="w-full p-2 border rounded"
            placeholder="Phone"
          />
          <input
            type="email"
            value={props.contactPoint?.email || ''}
            onChange={(e) => onChange({
              ...props,
              contactPoint: { ...props.contactPoint, email: e.target.value },
            })}
            className="w-full p-2 border rounded"
            placeholder="Email"
          />
        </div>
      </div>
    </div>
  );
}

export function CompanyCardBlockRender({ block }: BlockRenderProps) {
  const props = block.props as CompanyCardProps;

  if (!props.name) return null;

  return (
    <div className="my-6 p-6 border rounded-lg bg-gray-50">
      {props.logo && (
        <img src={props.logo} alt={props.name} className="h-16 mb-4" />
      )}
      <h3 className="text-2xl font-bold mb-2">{props.name}</h3>
      {props.description && (
        <p className="text-gray-700 mb-4">{props.description}</p>
      )}
      {props.address && (
        <div className="text-sm text-gray-600 mb-2">
          {props.address.streetAddress && <div>{props.address.streetAddress}</div>}
          {props.address.postalCode && props.address.addressLocality && (
            <div>{props.address.postalCode} {props.address.addressLocality}</div>
          )}
          {props.address.addressCountry && <div>{props.address.addressCountry}</div>}
        </div>
      )}
      {props.contactPoint && (
        <div className="text-sm text-gray-600">
          {props.contactPoint.telephone && <div>Phone: {props.contactPoint.telephone}</div>}
          {props.contactPoint.email && <div>Email: {props.contactPoint.email}</div>}
        </div>
      )}
      {props.url && (
        <a href={props.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline mt-2 inline-block">
          Visit Website
        </a>
      )}
    </div>
  );
}

