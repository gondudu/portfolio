
import React from 'react';
import { CREW_MANIFEST, CrewMember } from '@/lib/console-data';

interface RemotionCrewManifestProps {
  alertMode: boolean;
  selectedCrewMemberId: string | null;
}

export const RemotionCrewManifest: React.FC<RemotionCrewManifestProps> = ({
  alertMode,
  selectedCrewMemberId,
}) => {
  const selected = selectedCrewMemberId ? CREW_MANIFEST.find(member => member.id === selectedCrewMemberId) : null;

  const borderColor = alertMode ? 'border-console-red' : 'border-console-border';
  const dimColor = alertMode ? 'text-console-red opacity-60' : 'text-console-phosphor-dim';
  const textColor = alertMode ? 'text-console-red' : 'text-console-phosphor';

  const statusColor = (status: CrewMember['status']) => {
    if (status === 'DECEASED') return 'text-console-red';
    if (status === 'ATTACHED') return 'text-console-amber';
    return 'text-console-phosphor';
  };

  if (selected) {
    const isDeceased = selected.deceased;
    const isEduardo = selected.isEduardo;

    return (
      <div
        className={`crt-monitor crt-screen-glow h-full border ${borderColor} bg-console-panel flex flex-col font-console transition-colors duration-300`}
      >
        <div className={`flex items-center gap-2 px-3 py-2 border-b ${borderColor} ${dimColor} text-xs`}>
          <span className={`${textColor}`}>← BACK</span> {/* No actual back functionality */}
          <span>■</span>
          <span>PERSONNEL FILE</span>
        </div>

        <div className="flex-1 px-4 py-4">
          {isDeceased ? (
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <div className="text-console-red text-4xl">☠</div>
              <div className="text-console-red text-lg">{selected.name}</div>
              <div className="border border-console-red p-4 text-center">
                <div className="text-console-red text-sm mb-2">RECORD SEALED</div>
                <div className="text-console-red opacity-70 text-xs">
                  INCIDENT REPORT: LV-426
                </div>
                <div className="text-console-red opacity-50 text-xs mt-2">
                  ACCESS REQUIRES LEVEL 4 CLEARANCE
                </div>
              </div>
            </div>
          ) : isEduardo ? (
            <div>
              <div className={`${dimColor} text-xs mb-1`}>PERSONNEL FILE — CLASSIFIED: LEVEL 1</div>
              <div className={`${textColor} text-lg mb-1`}>{selected.name}</div>
              <div className={`${dimColor} text-xs mb-4`}>{selected.rank} ■ {selected.speciality}</div>

              <div className={`border ${borderColor} p-3 mb-4`}>
                <div className={`${dimColor} text-[10px] mb-2`}>STATUS</div>
                <div className={`text-console-amber text-sm`}>{selected.status}</div>
              </div>

              <div className={`${dimColor} text-xs mb-2`}>BIO</div>
              <div className={`${textColor} text-sm leading-relaxed`}>{selected.bio}</div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <div className={`${textColor} text-lg`}>{selected.name}</div>
              <div className={`${dimColor} text-sm`}>{selected.rank}</div>
              <div className={`${dimColor} text-xs`}>STATUS: {selected.status}</div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`crt-monitor crt-screen-glow h-full border ${borderColor} bg-console-panel flex flex-col font-console transition-colors duration-300`}
    >
      <div className={`flex items-center gap-2 px-3 py-2 border-b ${borderColor} ${dimColor} text-xs`}>
        <span>CREW MANIFEST</span>
        <span>■</span>
        <span>{CREW_MANIFEST.length} PERSONNEL</span>
        <span className="ml-auto">USCSS NOSTROMO</span>
      </div>

      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
        {CREW_MANIFEST.map(member => (
          <div
            key={member.id}
            className={`w-full text-left px-4 py-2.5 border-b ${borderColor} transition-colors group`}
          >
            <div className="flex items-center justify-between">
              <div>
                <span
                  className={`text-sm transition-colors ${
                    member.isEduardo
                      ? 'text-console-amber'
                      : member.deceased
                      ? 'text-console-red line-through opacity-60'
                      : `${textColor}`
                  }`}
                >
                  {member.name}
                </span>
                <span className={`${dimColor} text-xs ml-2`}>{member.rank}</span>
              </div>
              <span className={`text-xs ${statusColor(member.status)}`}>
                {member.status}
              </span>
            </div>
            <div className={`${dimColor} text-[10px] mt-0.5`}>{member.speciality}</div>
          </div>
        ))}
      </div>

      <div className={`px-3 py-2 border-t ${borderColor} ${dimColor} font-console text-[10px]`}>
        VIEW CREW MEMBER DETAILS
      </div>
    </div>
  );
};
