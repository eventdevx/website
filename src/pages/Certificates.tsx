import {
  Award,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Download,
  FileCheck2,
  FileSpreadsheet,
  Loader2,
  Palette,
  QrCode,
  ShieldCheck,
  Sparkles,
  Upload,
  UserRound,
  X,
  Zap,
} from "lucide-react";

import {
  ChangeEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  DashboardLayout,
} from "@/components/layout/DashboardLayout";

import {
  Button,
} from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Badge,
} from "@/components/ui/badge";


/* ============================================================
   CERTIFICATE TEMPLATE TYPE
   ============================================================ */

type CertificateTemplate =
  | "classic"
  | "gold"
  | "dark";


/* ============================================================
   CERTIFICATE DATA
   ============================================================ */

interface CertificateData {

  name: string;

  event: string;

  role: string;

  date: string;

  org: string;

  id: string;

}


/* ============================================================
   DEFAULT CERTIFICATE DATA
   ============================================================ */

const DEFAULT_CERTIFICATE:
  CertificateData = {

  name:
    "",

  event:
    "Indo-Hack 2026",

  role:
    "Participant",

  date:
    new Date()
      .toISOString()
      .split("T")[0],

  org:
    "EventDevX",

  id:
    "",

};


/* ============================================================
   TEMPLATE CONFIG
   ============================================================ */

const TEMPLATE_CONFIG = {

  classic: {

    label:
      "Classic",

    description:
      "Professional EventDevX blue certificate.",

    previewClass:
      "bg-gradient-to-br from-indigo-600 to-violet-500",

    pageClass:
      "bg-white",

    borderClass:
      "border-indigo-500",

    accentClass:
      "text-indigo-600",

    headerClass:
      "bg-gradient-to-r from-indigo-600 to-violet-500",

    watermarkClass:
      "text-indigo-600/5",

  },

  gold: {

    label:
      "Gold",

    description:
      "Achievement-focused premium gold style.",

    previewClass:
      "bg-gradient-to-br from-amber-700 to-yellow-500",

    pageClass:
      "bg-amber-50",

    borderClass:
      "border-amber-600",

    accentClass:
      "text-amber-700",

    headerClass:
      "bg-gradient-to-r from-amber-800 to-amber-500",

    watermarkClass:
      "text-amber-600/5",

  },

  dark: {

    label:
      "Dark",

    description:
      "High-contrast dark EventDevX certificate.",

    previewClass:
      "bg-gradient-to-br from-slate-950 to-slate-700",

    pageClass:
      "bg-slate-950",

    borderClass:
      "border-slate-500",

    accentClass:
      "text-indigo-300",

    headerClass:
      "bg-gradient-to-r from-slate-950 to-slate-700",

    watermarkClass:
      "text-white/5",

  },

};


/* ============================================================
   ID GENERATOR
   ============================================================ */

function generateCertificateId() {

  const chars =
    "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";


  let id =
    "EDVX-";


  for (
    let index = 0;
    index < 12;
    index++
  ) {

    if (
      index === 4 ||
      index === 8
    ) {

      id += "-";

    }


    id +=
      chars[
        Math.floor(
          Math.random() *
          chars.length
        )
      ];

  }


  return id;

}


/* ============================================================
   DATE FORMATTER
   ============================================================ */

function formatCertificateDate(
  value: string
) {

  if (!value) {

    return "April 24, 2026";

  }


  const date =
    new Date(
      `${value}T00:00:00`
    );


  if (
    Number.isNaN(
      date.getTime()
    )
  ) {

    return value;

  }


  return date.toLocaleDateString(
    "en-IN",
    {
      day:
        "numeric",

      month:
        "long",

      year:
        "numeric",
    }
  );

}


/* ============================================================
   TEXT HELPER
   ============================================================ */

function certificateValue(
  value: string,
  fallback: string
) {

  return value.trim()
    ? value
    : fallback;

}


/* ============================================================
   CERTIFICATE PREVIEW
   ============================================================ */

interface CertificatePreviewProps {

  data:
    CertificateData;

  template:
    CertificateTemplate;

}


/* ============================================================
   CERTIFICATE PREVIEW COMPONENT
   ============================================================ */

const CertificatePreview = ({
  data,
  template,
}: CertificatePreviewProps) => {

  const theme =
    TEMPLATE_CONFIG[
      template
    ];


  const displayName =
    certificateValue(
      data.name,
      "Participant Name"
    );


  const displayEvent =
    certificateValue(
      data.event,
      "EventDevX Event"
    );


  const displayRole =
    certificateValue(
      data.role,
      "Participant"
    );


  const displayOrg =
    certificateValue(
      data.org,
      "EventDevX"
    );


  const displayId =
    certificateValue(
      data.id,
      "EDVX-XXXX-XXXX"
    );


  return (

    <div
      className="
        overflow-hidden
        rounded-[1.5rem]
        bg-slate-100
        p-3
        sm:p-5
      "
    >

      {/* ==================================================
          CERTIFICATE PAPER
          ================================================== */}

      <div
        id="certificate-render"
        className={`
          relative
          aspect-[900/640]
          w-full
          overflow-hidden
          rounded-2xl
          border-[6px]
          shadow-2xl
          ${theme.pageClass}
          ${theme.borderClass}
        `}
      >

        {/* ==================================================
            INNER BORDER
            ================================================== */}

        <div
          className={`
            pointer-events-none
            absolute
            inset-3
            rounded-xl
            border-2
            border-dashed
            opacity-30
            ${theme.borderClass}
          `}
        />


        {/* ==================================================
            WATERMARK
            ================================================== */}

        <div
          className={`
            pointer-events-none
            absolute
            bottom-[-15%]
            right-[-8%]
            select-none
            text-[7rem]
            font-black
            leading-none
            tracking-tighter
            sm:text-[10rem]
            ${theme.watermarkClass}
          `}
        >
          VERIFIED
        </div>


        {/* ==================================================
            HEADER
            ================================================== */}

        <div
          className={`
            absolute
            left-[4.4%]
            right-[4.4%]
            top-[6.2%]
            flex
            items-center
            justify-between
            gap-3
            rounded-xl
            px-4
            py-3
            sm:px-6
            sm:py-4
            ${theme.headerClass}
          `}
        >

          {/* ================================================
              BRAND
              ================================================ */}

          <div
            className="
              flex
              min-w-0
              items-center
              gap-2.5
              sm:gap-3
            "
          >

            <div
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-white/15
                text-white
                sm:h-11
                sm:w-11
              "
            >

              <Zap
                className="
                  h-4
                  w-4
                  sm:h-5
                  sm:w-5
                "
              />

            </div>


            <div
              className="
                min-w-0
              "
            >

              <p
                className="
                  truncate
                  text-sm
                  font-black
                  text-white
                  sm:text-xl
                "
              >
                EventDevX
              </p>


              <p
                className="
                  truncate
                  text-[7px]
                  font-semibold
                  text-white/65
                  sm:text-[10px]
                "
              >
                Community Infrastructure Platform
              </p>

            </div>

          </div>


          {/* ================================================
              CERTIFICATE ID
              ================================================ */}

          <div
            className="
              shrink-0
              rounded-lg
              bg-white/10
              px-2.5
              py-1.5
              text-center
              sm:px-4
              sm:py-2
            "
          >

            <p
              className="
                text-[6px]
                font-extrabold
                uppercase
                tracking-widest
                text-white/65
                sm:text-[8px]
              "
            >
              Certificate ID
            </p>


            <p
              className="
                mt-0.5
                text-[7px]
                font-black
                text-white
                sm:text-[10px]
              "
            >
              {displayId}
            </p>

          </div>

        </div>


        {/* ==================================================
            TITLE
            ================================================== */}

        <div
          className="
            absolute
            left-[8%]
            right-[8%]
            top-[27%]
            text-center
          "
        >

          <p
            className={`
              text-[7px]
              font-extrabold
              uppercase
              tracking-[0.18em]
              sm:text-[10px]
              ${theme.accentClass}
            `}
          >
            C E R T I F I C A T E
            {" "}
            O F
            {" "}
            A C H I E V E M E N T
          </p>


          <div
            className={`
              mx-auto
              mt-2
              h-px
              w-1/2
              bg-current
              opacity-20
              ${theme.accentClass}
            `}
          />

        </div>


        {/* ==================================================
            BODY
            ================================================== */}

        <div
          className="
            absolute
            left-[8%]
            right-[8%]
            top-[36%]
            text-center
          "
        >

          <p
            className={`
              text-[7px]
              sm:text-[10px]
              ${
                template ===
                "dark"
                  ? "text-slate-400"
                  : "text-slate-500"
              }
            `}
          >
            This is to certify that
          </p>


          <h2
            className={`
              mt-2
              truncate
              text-[1.35rem]
              font-black
              tracking-tight
              sm:text-4xl
              ${
                template ===
                "dark"
                  ? "text-white"
                  : "text-slate-900"
              }
            `}
          >
            {displayName}
          </h2>


          <div
            className={`
              mx-auto
              mt-1
              h-0.5
              w-1/3
              opacity-30
              ${
                template ===
                "gold"
                  ? "bg-amber-600"
                  : "bg-indigo-500"
              }
            `}
          />


          <p
            className={`
              mt-4
              text-[7px]
              sm:text-[10px]
              ${
                template ===
                "dark"
                  ? "text-slate-400"
                  : "text-slate-500"
              }
            `}
          >
            has successfully participated in
          </p>


          <h3
            className={`
              mt-2
              truncate
              text-sm
              font-black
              sm:text-2xl
              ${
                template ===
                "dark"
                  ? "text-white"
                  : "text-slate-900"
              }
            `}
          >
            {displayEvent}
          </h3>


          {/* ================================================
              ROLE BADGE
              ================================================ */}

          <div
            className={`
              mx-auto
              mt-3
              w-fit
              rounded-full
              px-4
              py-1.5
              text-[7px]
              font-black
              sm:px-6
              sm:py-2
              sm:text-[10px]
              ${
                template ===
                "classic"
                  ? "bg-indigo-50 text-indigo-700"
                  : template ===
                    "gold"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-slate-800 text-indigo-300"
              }
            `}
          >
            {displayRole}
          </div>

        </div>


        {/* ==================================================
            FOOTER LINE
            ================================================== */}

        <div
          className={`
            absolute
            left-[7%]
            right-[7%]
            top-[73%]
            h-px
            opacity-20
            ${
              template ===
              "gold"
                ? "bg-amber-600"
                : template ===
                  "dark"
                    ? "bg-white"
                    : "bg-indigo-600"
            }
          `}
        />


        {/* ==================================================
            ISSUE DATE
            ================================================== */}

        <div
          className="
            absolute
            left-[9%]
            top-[77%]
          "
        >

          <p
            className={`
              text-[6px]
              font-extrabold
              uppercase
              tracking-widest
              sm:text-[8px]
              ${
                template ===
                "dark"
                  ? "text-slate-500"
                  : "text-slate-400"
              }
            `}
          >
            Date of Issue
          </p>


          <p
            className={`
              mt-1
              text-[7px]
              font-black
              sm:text-[10px]
              ${
                template ===
                "dark"
                  ? "text-white"
                  : "text-slate-800"
              }
            `}
          >
            {formatCertificateDate(
              data.date
            )}
          </p>

        </div>


        {/* ==================================================
            AUTHORIZED SIGNATURE
            ================================================== */}

        <div
          className="
            absolute
            left-1/2
            top-[77%]
            -translate-x-1/2
            text-center
          "
        >

          <div
            className={`
              mx-auto
              h-px
              w-20
              opacity-40
              sm:w-28
              ${
                template ===
                "gold"
                  ? "bg-amber-600"
                  : template ===
                    "dark"
                      ? "bg-white"
                      : "bg-indigo-600"
              }
            `}
          />


          <p
            className={`
              mt-1
              text-[6px]
              font-extrabold
              uppercase
              tracking-widest
              sm:text-[8px]
              ${
                template ===
                "dark"
                  ? "text-slate-500"
                  : "text-slate-400"
              }
            `}
          >
            Authorized Signature
          </p>

        </div>


        {/* ==================================================
            ISSUED BY
            ================================================== */}

        <div
          className="
            absolute
            right-[9%]
            top-[77%]
            text-right
          "
        >

          <p
            className={`
              text-[6px]
              font-extrabold
              uppercase
              tracking-widest
              sm:text-[8px]
              ${
                template ===
                "dark"
                  ? "text-slate-500"
                  : "text-slate-400"
              }
            `}
          >
            Issued By
          </p>


          <p
            className={`
              mt-1
              text-[7px]
              font-black
              sm:text-[10px]
              ${
                template ===
                "dark"
                  ? "text-indigo-300"
                  : "text-indigo-600"
              }
            `}
          >
            {displayOrg}
          </p>

        </div>


        {/* ==================================================
            QR STYLE BLOCK
            ================================================== */}

        <div
          className="
            absolute
            bottom-[7%]
            left-[8%]
            flex
            items-center
            gap-1.5
            sm:gap-2.5
          "
        >

          <div
            className={`
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              sm:h-12
              sm:w-12
              ${
                template ===
                "dark"
                  ? "bg-white text-slate-900"
                  : "bg-slate-900 text-white"
              }
            `}
          >

            <QrCode
              className="
                h-5
                w-5
                sm:h-7
                sm:w-7
              "
            />

          </div>


          <p
            className={`
              text-[5px]
              font-black
              uppercase
              tracking-wider
              sm:text-[7px]
              ${
                template ===
                "dark"
                  ? "text-slate-500"
                  : "text-slate-400"
              }
            `}
          >
            Verify
            <br />
            Authenticity
          </p>

        </div>


        {/* ==================================================
            VERIFIED STAMP
            ================================================== */}

        <div
          className={`
            absolute
            bottom-[7%]
            right-[8%]
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            border-2
            sm:h-14
            sm:w-14
            ${
              template ===
              "classic"
                ? "border-indigo-300 text-indigo-500"
                : template ===
                  "gold"
                    ? "border-amber-400 text-amber-600"
                    : "border-indigo-400 text-indigo-300"
            }
          `}
        >

          <ShieldCheck
            className="
              h-5
              w-5
              sm:h-7
              sm:w-7
            "
          />

        </div>

      </div>

    </div>

  );

};


/* ============================================================
   TEMPLATE CARD
   ============================================================ */

interface TemplateCardProps {

  name:
    CertificateTemplate;

  selected:
    boolean;

  onSelect:
    (
      name:
        CertificateTemplate
    ) => void;

}


/* ============================================================
   TEMPLATE CARD COMPONENT
   ============================================================ */

const TemplateCard = ({
  name,
  selected,
  onSelect,
}: TemplateCardProps) => {

  const config =
    TEMPLATE_CONFIG[
      name
    ];


  return (

    <button
      type="button"
      onClick={() =>
        onSelect(
          name
        )
      }
      className={`
        group
        rounded-2xl
        border
        p-2.5
        text-left
        transition-all
        duration-200
        ${
          selected
            ? "border-primary bg-primary/5 shadow-sm"
            : "border-border/70 bg-background hover:border-primary/30 hover:bg-muted/20"
        }
      `}
    >

      <div
        className={`
          relative
          h-20
          overflow-hidden
          rounded-xl
          ${config.previewClass}
        `}
      >

        <div
          className="
            absolute
            inset-2
            rounded-lg
            border
            border-white/30
          "
        />


        <div
          className="
            absolute
            inset-0
            flex
            items-center
            justify-center
          "
        >

          <span
            className="
              text-[9px]
              font-black
              tracking-[0.16em]
              text-white
            "
          >
            {name.toUpperCase()}
          </span>

        </div>


        {selected && (

          <div
            className="
              absolute
              right-2
              top-2
              flex
              h-5
              w-5
              items-center
              justify-center
              rounded-full
              bg-white
              text-primary
              shadow-sm
            "
          >

            <CheckCircle2
              className="
                h-3.5
                w-3.5
              "
            />

          </div>

        )}

      </div>


      <p
        className="
          mt-2
          text-xs
          font-extrabold
          text-foreground
        "
      >
        {config.label}
      </p>


      <p
        className="
          mt-0.5
          text-[9px]
          font-medium
          leading-4
          text-muted-foreground
        "
      >
        {config.description}
      </p>

    </button>

  );

};


/* ============================================================
   CERTIFICATES PAGE
   ============================================================ */

const Certificates = () => {

  /* ==========================================================
     TEMPLATE
     ========================================================== */

  const [
    selectedTemplate,
    setSelectedTemplate,
  ] = useState<
    CertificateTemplate
  >(
    "classic"
  );


  /* ==========================================================
     CERTIFICATE DATA
     ========================================================== */

  const [
    certificate,
    setCertificate,
  ] = useState<
    CertificateData
  >(
    DEFAULT_CERTIFICATE
  );


  /* ==========================================================
     GENERATED STATE
     ========================================================== */

  const [
    generated,
    setGenerated,
  ] = useState(
    false
  );


  /* ==========================================================
     GENERATING STATE
     ========================================================== */

  const [
    generating,
    setGenerating,
  ] = useState(
    false
  );


  /* ==========================================================
     DOWNLOADING STATE
     ========================================================== */

  const [
    downloading,
    setDownloading,
  ] = useState(
    false
  );


  /* ==========================================================
     BULK CSV STATE
     ========================================================== */

  const [
    bulkFile,
    setBulkFile,
  ] = useState<
    File | null
  >(
    null
  );


  const [
    bulkStatus,
    setBulkStatus,
  ] = useState("");


  const [
    bulkProcessing,
    setBulkProcessing,
  ] = useState(
    false
  );


  /* ==========================================================
     STATUS MESSAGE
     ========================================================== */

  const [
    statusMessage,
    setStatusMessage,
  ] = useState("");


  /* ==========================================================
     FILE INPUT REF
     ========================================================== */

  const fileInputRef =
    useRef<HTMLInputElement | null>(
      null
    );


  /* ==========================================================
     CURRENT ID
     ========================================================== */

  useEffect(
    () => {

      setCertificate(
        (
          current
        ) => ({

          ...current,

          id:
            current.id ||
            generateCertificateId(),

        })
      );

    },
    []
  );


  /* ==========================================================
     UPDATE CERTIFICATE FIELD
     ========================================================== */

  const updateCertificate = (
    field:
      keyof CertificateData,
    value:
      string
  ) => {

    setCertificate(
      (
        current
      ) => ({

        ...current,

        [field]:
          value,

      })
    );


    setGenerated(
      false
    );


    setStatusMessage(
      ""
    );

  };


  /* ==========================================================
     TEMPLATE CHANGE
     ========================================================== */

  const handleTemplateChange = (
    template:
      CertificateTemplate
  ) => {

    setSelectedTemplate(
      template
    );


    setGenerated(
      false
    );

  };


  /* ==========================================================
     GENERATE CERTIFICATE
     ========================================================== */

  const handleGenerate =
    () => {

      setGenerating(
        true
      );


      setStatusMessage(
        ""
      );


      const freshId =
        generateCertificateId();


      setCertificate(
        (
          current
        ) => ({

          ...current,

          id:
            freshId,

        })
      );


      window.setTimeout(
        () => {

          setGenerating(
            false
          );


          setGenerated(
            true
          );


          setStatusMessage(
            "Certificate generated successfully. You can now download the PNG."
          );

        },
        800
      );

    };


  /* ==========================================================
     BUILD CERTIFICATE IMAGE
     ========================================================== */

  const buildCertificateCanvas =
    async () => {

      const canvas =
        document.createElement(
          "canvas"
        );


      const width =
        1800;


      const height =
        1280;


      canvas.width =
        width;


      canvas.height =
        height;


      const context =
        canvas.getContext(
          "2d"
        );


      if (!context) {

        throw new Error(
          "Unable to create certificate image."
        );

      }


      /* ======================================================
         TEMPLATE COLORS
         ====================================================== */

      const colors = {

        classic: {

          background:
            "#ffffff",

          border:
            "#4f46e5",

          borderInner:
            "#c7d2fe",

          headerStart:
            "#4f46e5",

          headerEnd:
            "#8b5cf6",

          heading:
            "#4f46e5",

          body:
            "#64748b",

          name:
            "#0f172a",

          event:
            "#0f172a",

          badge:
            "#eef2ff",

          badgeText:
            "#4338ca",

          footer:
            "#64748b",

          watermark:
            "rgba(79,70,229,0.05)",

        },

        gold: {

          background:
            "#fffbeb",

          border:
            "#d97706",

          borderInner:
            "#fcd34d",

          headerStart:
            "#92400e",

          headerEnd:
            "#f59e0b",

          heading:
            "#b45309",

          body:
            "#78716c",

          name:
            "#451a03",

          event:
            "#451a03",

          badge:
            "#fef3c7",

          badgeText:
            "#92400e",

          footer:
            "#78716c",

          watermark:
            "rgba(217,119,6,0.05)",

        },

        dark: {

          background:
            "#0f172a",

          border:
            "#64748b",

          borderInner:
            "#475569",

          headerStart:
            "#020617",

          headerEnd:
            "#334155",

          heading:
            "#a5b4fc",

          body:
            "#94a3b8",

          name:
            "#ffffff",

          event:
            "#ffffff",

          badge:
            "#1e293b",

          badgeText:
            "#a5b4fc",

          footer:
            "#94a3b8",

          watermark:
            "rgba(255,255,255,0.04)",

        },

      };


      const theme =
        colors[
          selectedTemplate
        ];


      /* ======================================================
         BACKGROUND
         ====================================================== */

      context.fillStyle =
        theme.background;


      context.fillRect(
        0,
        0,
        width,
        height
      );


      /* ======================================================
         OUTER BORDER
         ====================================================== */

      context.strokeStyle =
        theme.border;


      context.lineWidth =
        18;


      context.strokeRect(
        24,
        24,
        width - 48,
        height - 48
      );


      /* ======================================================
         INNER DASHED BORDER
         ====================================================== */

      context.strokeStyle =
        theme.borderInner;


      context.lineWidth =
        4;


      context.setLineDash([
        16,
        10,
      ]);


      context.strokeRect(
        48,
        48,
        width - 96,
        height - 96
      );


      context.setLineDash(
        []
      );


      /* ======================================================
         CORNER DECORATIONS
         ====================================================== */

      const corners = [

        [
          70,
          70,
        ],

        [
          width - 70,
          70,
        ],

        [
          70,
          height - 70,
        ],

        [
          width - 70,
          height - 70,
        ],

      ];


      corners.forEach(
        (
          [x, y]
        ) => {

          context.fillStyle =
            theme.border;


          context.beginPath();


          context.arc(
            x,
            y,
            14,
            0,
            Math.PI *
              2
          );


          context.fill();

        }
      );


      /* ======================================================
         HEADER
         ====================================================== */

      const headerGradient =
        context.createLinearGradient(
          80,
          80,
          width - 80,
          160
        );


      headerGradient.addColorStop(
        0,
        theme.headerStart
      );


      headerGradient.addColorStop(
        1,
        theme.headerEnd
      );


      context.fillStyle =
        headerGradient;


      if (
        "roundRect" in
        context &&
        typeof context.roundRect ===
          "function"
      ) {

        context.beginPath();


        context.roundRect(
          80,
          80,
          width - 160,
          150,
          24
        );


        context.fill();

      } else {

        context.fillRect(
          80,
          80,
          width - 160,
          150
        );

      }


      /* ======================================================
         LOGO CIRCLE
         ====================================================== */

      context.fillStyle =
        "rgba(255,255,255,0.16)";


      context.beginPath();


      context.arc(
        150,
        155,
        42,
        0,
        Math.PI *
          2
      );


      context.fill();


      context.fillStyle =
        "#ffffff";


      context.font =
        "bold 30px Arial";


      context.textAlign =
        "center";


      context.fillText(
        "E",
        150,
        166
      );


      /* ======================================================
         BRAND
         ====================================================== */

      context.textAlign =
        "left";


      context.fillStyle =
        "#ffffff";


      context.font =
        "900 44px Arial";


      context.fillText(
        "EventDevX",
        220,
        150
      );


      context.font =
        "600 22px Arial";


      context.fillStyle =
        "rgba(255,255,255,0.68)";


      context.fillText(
        "Community Infrastructure Platform",
        220,
        185
      );


      /* ======================================================
         CERTIFICATE ID BOX
         ====================================================== */

      context.fillStyle =
        "rgba(255,255,255,0.12)";


      if (
        "roundRect" in
        context &&
        typeof context.roundRect ===
          "function"
      ) {

        context.beginPath();


        context.roundRect(
          width - 390,
          105,
          260,
          100,
          18
        );


        context.fill();

      } else {

        context.fillRect(
          width - 390,
          105,
          260,
          100
        );

      }


      context.textAlign =
        "center";


      context.fillStyle =
        "rgba(255,255,255,0.7)";


      context.font =
        "700 15px Arial";


      context.fillText(
        "CERTIFICATE ID",
        width - 260,
        140
      );


      context.fillStyle =
        "#ffffff";


      context.font =
        "900 20px monospace";


      context.fillText(
        certificateValue(
          certificate.id,
          "EDVX-XXXX-XXXX"
        ),
        width - 260,
        175
      );


      /* ======================================================
         CERTIFICATE TITLE
         ====================================================== */

      context.fillStyle =
        theme.heading;


      context.font =
        "800 20px Arial";


      context.textAlign =
        "center";


      context.fillText(
        "C E R T I F I C A T E   O F   A C H I E V E M E N T",
        width / 2,
        310
      );


      /* ======================================================
         TITLE LINE
         ====================================================== */

      const titleGradient =
        context.createLinearGradient(
          560,
          330,
          1240,
          330
        );


      titleGradient.addColorStop(
        0,
        "rgba(0,0,0,0)"
      );


      titleGradient.addColorStop(
        0.5,
        theme.heading
      );


      titleGradient.addColorStop(
        1,
        "rgba(0,0,0,0)"
      );


      context.strokeStyle =
        titleGradient;


      context.lineWidth =
        3;


      context.beginPath();


      context.moveTo(
        560,
        330
      );


      context.lineTo(
        1240,
        330
      );


      context.stroke();


      /* ======================================================
         BODY TEXT
         ====================================================== */

      context.fillStyle =
        theme.body;


      context.font =
        "500 24px Arial";


      context.fillText(
        "This is to certify that",
        width / 2,
        405
      );


      /* ======================================================
         NAME
         ====================================================== */

      const certificateName =
        certificateValue(
          certificate.name,
          "Participant Name"
        );


      context.fillStyle =
        theme.name;


      context.font =
        "900 64px Arial";


      context.fillText(
        certificateName,
        width / 2,
        505
      );


      /* ======================================================
         NAME UNDERLINE
         ====================================================== */

      const nameWidth =
        context.measureText(
          certificateName
        ).width;


      context.strokeStyle =
        theme.name;


      context.globalAlpha =
        0.25;


      context.lineWidth =
        3;


      context.beginPath();


      context.moveTo(
        width / 2 -
          nameWidth / 2,
        525
      );


      context.lineTo(
        width / 2 +
          nameWidth / 2,
        525
      );


      context.stroke();


      context.globalAlpha =
        1;


      /* ======================================================
         PARTICIPATION TEXT
         ====================================================== */

      context.fillStyle =
        theme.body;


      context.font =
        "500 24px Arial";


      context.fillText(
        "has successfully participated in",
        width / 2,
        585
      );


      /* ======================================================
         EVENT
         ====================================================== */

      const eventName =
        certificateValue(
          certificate.event,
          "EventDevX Event"
        );


      context.fillStyle =
        theme.event;


      context.font =
        "900 40px Arial";


      context.fillText(
        eventName,
        width / 2,
        645
      );


      /* ======================================================
         ROLE BADGE
         ====================================================== */

      const roleName =
        certificateValue(
          certificate.role,
          "Participant"
        );


      const roleWidth =
        context.measureText(
          roleName
        ).width +
        70;


      context.fillStyle =
        theme.badge;


      if (
        "roundRect" in
        context &&
        typeof context.roundRect ===
          "function"
      ) {

        context.beginPath();


        context.roundRect(
          width / 2 -
            roleWidth / 2,
          680,
          roleWidth,
          54,
          27
        );


        context.fill();

      } else {

        context.fillRect(
          width / 2 -
            roleWidth / 2,
          680,
          roleWidth,
          54
        );

      }


      context.fillStyle =
        theme.badgeText;


      context.font =
        "900 20px Arial";


      context.fillText(
        roleName,
        width / 2,
        715
      );


      /* ======================================================
         FOOTER LINE
         ====================================================== */

      context.strokeStyle =
        theme.borderInner;


      context.lineWidth =
        2;


      context.beginPath();


      context.moveTo(
        120,
        780
      );


      context.lineTo(
        width - 120,
        780
      );


      context.stroke();


      /* ======================================================
         DATE
         ====================================================== */

      context.textAlign =
        "left";


      context.fillStyle =
        theme.footer;


      context.font =
        "800 15px Arial";


      context.fillText(
        "DATE OF ISSUE",
        150,
        830
      );


      context.fillStyle =
        theme.name;


      context.font =
        "900 21px Arial";


      context.fillText(
        formatCertificateDate(
          certificate.date
        ),
        150,
        862
      );


      /* ======================================================
         AUTHORIZED SIGNATURE
         ====================================================== */

      context.textAlign =
        "center";


      context.strokeStyle =
        theme.border;


      context.lineWidth =
        2;


      context.beginPath();


      context.moveTo(
        width / 2 -
          100,
        865
      );


      context.lineTo(
        width / 2 +
          100,
        865
      );


      context.stroke();


      context.fillStyle =
        theme.footer;


      context.font =
        "800 14px Arial";


      context.fillText(
        "AUTHORIZED SIGNATURE",
        width / 2,
        895
      );


      /* ======================================================
         ISSUER
         ====================================================== */

      context.textAlign =
        "right";


      context.fillStyle =
        theme.footer;


      context.font =
        "800 15px Arial";


      context.fillText(
        "ISSUED BY",
        width - 150,
        830
      );


      context.fillStyle =
        theme.heading;


      context.font =
        "900 21px Arial";


      context.fillText(
        certificateValue(
          certificate.org,
          "EventDevX"
        ),
        width - 150,
        862
      );


      /* ======================================================
         QR BLOCK
         ====================================================== */

      context.textAlign =
        "left";


      context.fillStyle =
        theme.name;


      context.fillRect(
        150,
        960,
        100,
        100
      );


      context.fillStyle =
        theme.background;


      context.font =
        "900 54px Arial";


      context.textAlign =
        "center";


      context.fillText(
        "QR",
        200,
        1025
      );


      context.fillStyle =
        theme.footer;


      context.font =
        "900 14px monospace";


      context.fillText(
        "VERIFY AUTHENTICITY",
        200,
        1090
      );


      /* ======================================================
         VERIFIED STAMP
         ====================================================== */

      context.strokeStyle =
        theme.border;


      context.lineWidth =
        6;


      context.beginPath();


      context.arc(
        width - 200,
        1010,
        68,
        0,
        Math.PI *
          2
      );


      context.stroke();


      context.fillStyle =
        theme.border;


      context.font =
        "900 20px Arial";


      context.fillText(
        "VERIFIED",
        width - 200,
        1018
      );


      /* ======================================================
         WATERMARK
         ====================================================== */

      context.save();


      context.translate(
        width / 2,
        height / 2
      );


      context.rotate(
        -Math.PI /
          14
      );


      context.fillStyle =
        theme.watermark;


      context.font =
        "900 130px Arial";


      context.fillText(
        "EVENTDEVX",
        0,
        0
      );


      context.restore();


      return canvas;

    };


  /* ==========================================================
     DOWNLOAD CERTIFICATE
     ========================================================== */

  const handleDownload =
    async () => {

      setDownloading(
        true
      );


      try {

        const canvas =
          await buildCertificateCanvas();


        const link =
          document.createElement(
            "a"
          );


        const filename =
          certificateValue(
            certificate.name,
            "certificate"
          )
            .trim()
            .replace(
              /\s+/g,
              "_"
            );


        link.download =
          `EventDevX_${filename}.png`;


        link.href =
          canvas.toDataURL(
            "image/png"
          );


        document.body.appendChild(
          link
        );


        link.click();


        document.body.removeChild(
          link
        );


        setGenerated(
          true
        );


        setStatusMessage(
          "Certificate PNG downloaded successfully."
        );

      } catch (
        error
      ) {

        console.error(
          "Certificate download error:",
          error
        );


        setStatusMessage(
          "Unable to create the certificate image."
        );

      } finally {

        setDownloading(
          false
        );

      }

    };


  /* ==========================================================
     FILE INPUT
     ========================================================== */

  const handleFileChange = (
    event:
      ChangeEvent<HTMLInputElement>
  ) => {

    const file =
      event.target.files?.[0];


    if (!file) {

      return;

    }


    setBulkFile(
      file
    );


    setBulkStatus(
      `${file.name} selected.`
    );

  };


  /* ==========================================================
     BULK PROCESS CSV
     ========================================================== */

  const handleBulkGenerate =
    async () => {

      if (!bulkFile) {

        setBulkStatus(
          "Please select a CSV file first."
        );

        return;

      }


      setBulkProcessing(
        true
      );


      setBulkStatus(
        "Reading CSV file..."
      );


      try {

        const content =
          await bulkFile.text();


        const lines =
          content
            .split(/\r?\n/)
            .map(
              (
                line
              ) =>
                line.trim()
            )
            .filter(
              Boolean
            );


        if (
          lines.length ===
          0
        ) {

          throw new Error(
            "CSV file is empty."
          );

        }


        const entries =
          lines
            .filter(
              (
                line
              ) => {

                const firstColumn =
                  line
                    .split(",")[0]
                    ?.trim()
                    .replace(
                      /^["']|["']$/g,
                      ""
                    );


                return (
                  firstColumn &&
                  firstColumn
                    .toLowerCase() !==
                    "name"
                );

              }
            )
            .map(
              (
                line
              ) =>
                line
                  .split(",")[0]
                  ?.trim()
                  .replace(
                    /^["']|["']$/g,
                    ""
                  )
            )
            .filter(
              Boolean
            );


        if (
          entries.length ===
          0
        ) {

          throw new Error(
            "No recipient names were found in the CSV."
          );

        }


        let processed =
          0;


        for (
          const name of
          entries
        ) {

          const canvas =
            await buildBulkCanvas(
              {
                ...certificate,
                name:
                  name ||
                  "Participant",

                id:
                  generateCertificateId(),
              }
            );


          const link =
            document.createElement(
              "a"
            );


          const safeName =
            (
              name ||
              "participant"
            )
              .replace(
                /\s+/g,
                "_"
              )
              .replace(
                /[^a-zA-Z0-9_-]/g,
                ""
              );


          link.download =
            `EventDevX_Certificate_${safeName}.png`;


          link.href =
            canvas.toDataURL(
              "image/png"
            );


          document.body.appendChild(
            link
          );


          link.click();


          document.body.removeChild(
            link
          );


          processed +=
            1;


          setBulkStatus(
            `Downloaded ${processed} of ${entries.length} certificates.`
          );


          await new Promise(
            (
              resolve
            ) =>
              window.setTimeout(
                resolve,
                300
              )
          );

        }


        setBulkStatus(
          `${processed} certificates generated successfully.`
        );


      } catch (
        error
      ) {

        console.error(
          "Bulk certificate error:",
          error
        );


        setBulkStatus(
          error instanceof Error
            ? error.message
            : "Unable to process CSV file."
        );


      } finally {

        setBulkProcessing(
          false
        );

      }

    };


  /* ==========================================================
     BULK CANVAS
     ========================================================== */

  const buildBulkCanvas =
    async (
      data:
        CertificateData
    ) => {

      const previous =
        certificate;


      setCertificate(
        data
      );


      const canvas =
        await buildCertificateCanvas();


      setCertificate(
        previous
      );


      return canvas;

    };


  /* ==========================================================
     BULK FILE PICKER
     ========================================================== */

  const openBulkPicker =
    () => {

      fileInputRef.current?.click();

    };


  /* ==========================================================
     SUMMARY
     ========================================================== */

  const certificateSummary =
    useMemo(
      () => ({

        template:
          TEMPLATE_CONFIG[
            selectedTemplate
          ].label,

        recipient:
          certificateValue(
            certificate.name,
            "Participant Name"
          ),

        event:
          certificateValue(
            certificate.event,
            "EventDevX Event"
          ),

        role:
          certificateValue(
            certificate.role,
            "Participant"
          ),

      }),
      [
        certificate,
        selectedTemplate,
      ]
    );


  /* ==========================================================
     RETURN
     ========================================================== */

  return (

    <DashboardLayout>

      <div
        className="
          space-y-6
          pb-10
        "
      >


        {/* ====================================================
            PAGE HEADER
            ==================================================== */}

        <section
          className="
            flex
            flex-col
            gap-4
            lg:flex-row
            lg:items-end
            lg:justify-between
          "
        >

          <div>

            <div
              className="
                mb-2
                flex
                items-center
                gap-2
              "
            >

              <div
                className="
                  flex
                  h-7
                  w-7
                  items-center
                  justify-center
                  rounded-lg
                  bg-amber-100
                  text-amber-600
                "
              >

                <Award
                  className="
                    h-4
                    w-4
                  "
                />

              </div>


              <span
                className="
                  text-[10px]
                  font-extrabold
                  uppercase
                  tracking-[0.15em]
                  text-amber-600
                "
              >
                EventDevX Credentials
              </span>

            </div>


            <h2
              className="
                text-3xl
                font-black
                tracking-tight
                text-foreground
                md:text-4xl
              "
            >
              Certificate Studio
            </h2>


            <p
              className="
                mt-2
                max-w-2xl
                text-sm
                font-medium
                leading-6
                text-muted-foreground
              "
            >
              Design, generate and download
              verified EventDevX certificates
              for participants, winners,
              contributors and event teams.
            </p>

          </div>


          {/* ==================================================
              STATUS
              ================================================== */}

          <div
            className="
              flex
              flex-wrap
              gap-2
            "
          >

            <Badge
              className="
                gap-2
                rounded-full
                bg-emerald-50
                text-[9px]
                font-extrabold
                uppercase
                tracking-wide
                text-emerald-700
              "
            >

              <span
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-emerald-500
                "
              />

              Studio Ready

            </Badge>


            {generated && (

              <Badge
                className="
                  gap-2
                  rounded-full
                  bg-indigo-50
                  text-[9px]
                  font-extrabold
                  uppercase
                  tracking-wide
                  text-indigo-700
                "
              >

                <CheckCircle2
                  className="
                    h-3
                    w-3
                  "
                />

                Generated

              </Badge>

            )}

          </div>

        </section>


        {/* ====================================================
            STUDIO GRID
            ==================================================== */}

        <section
          className="
            grid
            gap-6
            xl:grid-cols-[minmax(0,1fr)_minmax(420px,0.95fr)]
          "
        >


          {/* ==================================================
              LEFT PANEL
              ================================================== */}

          <div
            className="
              space-y-5
            "
          >


            {/* =================================================
                TEMPLATE SELECTOR
                ================================================= */}

            <Card
              className="
                rounded-2xl
                border
                border-border/70
                bg-card
                shadow-sm
              "
            >

              <CardHeader
                className="
                  px-5
                  pb-3
                  pt-5
                "
              >

                <div
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >

                  <Palette
                    className="
                      h-5
                      w-5
                      text-primary
                    "
                  />


                  <CardTitle
                    className="
                      text-base
                      font-black
                    "
                  >
                    Choose Template
                  </CardTitle>

                </div>


                <p
                  className="
                    mt-1
                    text-xs
                    font-medium
                    text-muted-foreground
                  "
                >
                  Select a certificate
                  design style.
                </p>

              </CardHeader>


              <CardContent
                className="
                  grid
                  gap-3
                  px-5
                  pb-6
                  sm:grid-cols-3
                "
              >

                <TemplateCard
                  name="classic"
                  selected={
                    selectedTemplate ===
                    "classic"
                  }
                  onSelect={
                    handleTemplateChange
                  }
                />


                <TemplateCard
                  name="gold"
                  selected={
                    selectedTemplate ===
                    "gold"
                  }
                  onSelect={
                    handleTemplateChange
                  }
                />


                <TemplateCard
                  name="dark"
                  selected={
                    selectedTemplate ===
                    "dark"
                  }
                  onSelect={
                    handleTemplateChange
                  }
                />

              </CardContent>

            </Card>


            {/* =================================================
                CERTIFICATE DETAILS
                ================================================= */}

            <Card
              className="
                rounded-2xl
                border
                border-border/70
                bg-card
                shadow-sm
              "
            >

              <CardHeader
                className="
                  px-5
                  pb-3
                  pt-5
                "
              >

                <div
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >

                  <FileCheck2
                    className="
                      h-5
                      w-5
                      text-primary
                    "
                  />


                  <CardTitle
                    className="
                      text-base
                      font-black
                    "
                  >
                    Certificate Details
                  </CardTitle>

                </div>

              </CardHeader>


              <CardContent
                className="
                  space-y-4
                  px-5
                  pb-6
                "
              >


                {/* ==============================================
                    RECIPIENT
                    ============================================== */}

                <div>

                  <label
                    className="
                      mb-2
                      block
                      text-[10px]
                      font-extrabold
                      uppercase
                      tracking-[0.1em]
                      text-slate-400
                    "
                  >
                    Recipient Full Name
                  </label>


                  <div
                    className="
                      relative
                    "
                  >

                    <UserRound
                      className="
                        pointer-events-none
                        absolute
                        left-4
                        top-1/2
                        h-4
                        w-4
                        -translate-y-1/2
                        text-slate-400
                      "
                    />


                    <input
                      type="text"
                      value={
                        certificate.name
                      }
                      onChange={(
                        event
                      ) =>
                        updateCertificate(
                          "name",
                          event.target.value
                        )
                      }
                      placeholder="e.g. Arjun Sharma"
                      className="
                        h-12
                        w-full
                        rounded-xl
                        border
                        border-slate-200
                        bg-slate-50
                        pl-11
                        pr-4
                        text-sm
                        font-medium
                        text-slate-900
                        outline-none
                        transition
                        placeholder:text-slate-400
                        focus:border-primary
                        focus:bg-white
                        focus:ring-4
                        focus:ring-primary/10
                      "
                    />

                  </div>

                </div>


                {/* ==============================================
                    EVENT
                    ============================================== */}

                <div>

                  <label
                    className="
                      mb-2
                      block
                      text-[10px]
                      font-extrabold
                      uppercase
                      tracking-[0.1em]
                      text-slate-400
                    "
                  >
                    Event / Hackathon Name
                  </label>


                  <input
                    type="text"
                    value={
                      certificate.event
                    }
                    onChange={(
                      event
                    ) =>
                      updateCertificate(
                        "event",
                        event.target.value
                      )
                    }
                    placeholder="e.g. Indo-Hack 2026"
                    className="
                      h-12
                      w-full
                      rounded-xl
                      border
                      border-slate-200
                      bg-slate-50
                      px-4
                      text-sm
                      font-medium
                      text-slate-900
                      outline-none
                      transition
                      placeholder:text-slate-400
                      focus:border-primary
                      focus:bg-white
                      focus:ring-4
                      focus:ring-primary/10
                    "
                  />

                </div>


                {/* ==============================================
                    ROLE
                    ============================================== */}

                <div>

                  <label
                    className="
                      mb-2
                      block
                      text-[10px]
                      font-extrabold
                      uppercase
                      tracking-[0.1em]
                      text-slate-400
                    "
                  >
                    Achievement / Role
                  </label>


                  <input
                    type="text"
                    value={
                      certificate.role
                    }
                    onChange={(
                      event
                    ) =>
                      updateCertificate(
                        "role",
                        event.target.value
                      )
                    }
                    placeholder="e.g. 1st Place Winner"
                    className="
                      h-12
                      w-full
                      rounded-xl
                      border
                      border-slate-200
                      bg-slate-50
                      px-4
                      text-sm
                      font-medium
                      text-slate-900
                      outline-none
                      transition
                      placeholder:text-slate-400
                      focus:border-primary
                      focus:bg-white
                      focus:ring-4
                      focus:ring-primary/10
                    "
                  />

                </div>


                {/* ==============================================
                    DATE + ISSUER
                    ============================================== */}

                <div
                  className="
                    grid
                    gap-4
                    sm:grid-cols-2
                  "
                >

                  <div>

                    <label
                      className="
                        mb-2
                        block
                        text-[10px]
                        font-extrabold
                        uppercase
                        tracking-[0.1em]
                        text-slate-400
                      "
                    >
                      Issue Date
                    </label>


                    <input
                      type="date"
                      value={
                        certificate.date
                      }
                      onChange={(
                        event
                      ) =>
                        updateCertificate(
                          "date",
                          event.target.value
                        )
                      }
                      className="
                        h-12
                        w-full
                        rounded-xl
                        border
                        border-slate-200
                        bg-slate-50
                        px-4
                        text-sm
                        font-medium
                        text-slate-900
                        outline-none
                        transition
                        focus:border-primary
                        focus:bg-white
                        focus:ring-4
                        focus:ring-primary/10
                      "
                    />

                  </div>


                  <div>

                    <label
                      className="
                        mb-2
                        block
                        text-[10px]
                        font-extrabold
                        uppercase
                        tracking-[0.1em]
                        text-slate-400
                      "
                    >
                      Issued By
                    </label>


                    <input
                      type="text"
                      value={
                        certificate.org
                      }
                      onChange={(
                        event
                      ) =>
                        updateCertificate(
                          "org",
                          event.target.value
                        )
                      }
                      placeholder="EventDevX"
                      className="
                        h-12
                        w-full
                        rounded-xl
                        border
                        border-slate-200
                        bg-slate-50
                        px-4
                        text-sm
                        font-medium
                        text-slate-900
                        outline-none
                        transition
                        placeholder:text-slate-400
                        focus:border-primary
                        focus:bg-white
                        focus:ring-4
                        focus:ring-primary/10
                      "
                    />

                  </div>

                </div>


                {/* ==============================================
                    CERTIFICATE ID
                    ============================================== */}

                <div>

                  <label
                    className="
                      mb-2
                      block
                      text-[10px]
                      font-extrabold
                      uppercase
                      tracking-[0.1em]
                      text-slate-400
                    "
                  >
                    Certificate ID (Auto)
                  </label>


                  <div
                    className="
                      relative
                    "
                  >

                    <ClipboardCheck
                      className="
                        pointer-events-none
                        absolute
                        left-4
                        top-1/2
                        h-4
                        w-4
                        -translate-y-1/2
                        text-primary
                      "
                    />


                    <input
                      type="text"
                      readOnly
                      value={
                        certificate.id
                      }
                      className="
                        h-12
                        w-full
                        rounded-xl
                        border
                        border-primary/20
                        bg-primary/5
                        pl-11
                        pr-4
                        text-sm
                        font-black
                        tracking-wider
                        text-primary
                        outline-none
                      "
                    />

                  </div>

                </div>


                {/* ==============================================
                    STATUS MESSAGE
                    ============================================== */}

                {statusMessage && (

                  <div
                    className="
                      flex
                      items-start
                      gap-3
                      rounded-2xl
                      border
                      border-emerald-100
                      bg-emerald-50
                      p-4
                    "
                  >

                    <CheckCircle2
                      className="
                        mt-0.5
                        h-4
                        w-4
                        shrink-0
                        text-emerald-600
                      "
                    />


                    <p
                      className="
                        text-xs
                        font-semibold
                        leading-5
                        text-emerald-700
                      "
                    >
                      {statusMessage}
                    </p>

                  </div>

                )}


                {/* ==============================================
                    MAIN ACTIONS
                    ============================================== */}

                <div
                  className="
                    grid
                    gap-3
                    sm:grid-cols-2
                  "
                >

                  <Button
                    type="button"
                    className="
                      h-12
                      gap-2
                      rounded-xl
                      font-extrabold
                    "
                    onClick={
                      handleGenerate
                    }
                    disabled={
                      generating
                    }
                  >

                    {generating ? (

                      <>
                        <Loader2
                          className="
                            h-4
                            w-4
                            animate-spin
                          "
                        />

                        Generating...

                      </>

                    ) : (

                      <>
                        <Sparkles
                          className="
                            h-4
                            w-4
                          "
                        />

                        Generate

                      </>

                    )}

                  </Button>


                  <Button
                    type="button"
                    variant="outline"
                    className="
                      h-12
                      gap-2
                      rounded-xl
                      font-extrabold
                    "
                    onClick={
                      handleDownload
                    }
                    disabled={
                      downloading
                    }
                  >

                    {downloading ? (

                      <>
                        <Loader2
                          className="
                            h-4
                            w-4
                            animate-spin
                          "
                        />

                        Creating PNG...

                      </>

                    ) : (

                      <>
                        <Download
                          className="
                            h-4
                            w-4
                          "
                        />

                        PNG

                      </>

                    )}

                  </Button>

                </div>

              </CardContent>

            </Card>


            {/* =================================================
                BULK CERTIFICATES
                ================================================= */}

            <Card
              className="
                rounded-2xl
                border
                border-border/70
                bg-card
                shadow-sm
              "
            >

              <CardHeader
                className="
                  px-5
                  pb-3
                  pt-5
                "
              >

                <div
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >

                  <FileSpreadsheet
                    className="
                      h-5
                      w-5
                      text-violet-600
                    "
                  />


                  <CardTitle
                    className="
                      text-base
                      font-black
                    "
                  >
                    Bulk CSV Certificates
                  </CardTitle>

                </div>


                <p
                  className="
                    mt-1
                    text-xs
                    font-medium
                    leading-5
                    text-muted-foreground
                  "
                >
                  Upload a CSV containing
                  recipient names to generate
                  multiple EventDevX certificates.
                </p>

              </CardHeader>


              <CardContent
                className="
                  px-5
                  pb-6
                "
              >

                <input
                  ref={
                    fileInputRef
                  }
                  type="file"
                  accept=".csv,text/csv"
                  className="
                    hidden
                  "
                  onChange={
                    handleFileChange
                  }
                />


                <div
                  className="
                    flex
                    flex-col
                    gap-4
                    rounded-2xl
                    border
                    border-dashed
                    border-slate-300
                    bg-slate-50
                    p-5
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                  "
                >

                  <div>

                    <p
                      className="
                        text-xs
                        font-extrabold
                        text-slate-900
                      "
                    >
                      CSV format
                    </p>


                    <p
                      className="
                        mt-1
                        text-[10px]
                        font-medium
                        leading-5
                        text-slate-500
                      "
                    >
                      First column should contain
                      recipient names.
                    </p>


                    {bulkFile && (

                      <p
                        className="
                          mt-2
                          text-[10px]
                          font-bold
                          text-primary
                        "
                      >
                        Selected:
                        {" "}
                        {bulkFile.name}
                      </p>

                    )}

                  </div>


                  <Button
                    type="button"
                    variant="outline"
                    className="
                      gap-2
                      rounded-xl
                    "
                    onClick={
                      openBulkPicker
                    }
                  >

                    <Upload
                      className="
                        h-4
                        w-4
                      "
                    />

                    Choose CSV

                  </Button>

                </div>


                {bulkStatus && (

                  <div
                    className="
                      mt-4
                      rounded-2xl
                      border
                      border-violet-100
                      bg-violet-50
                      p-4
                    "
                  >

                    <p
                      className="
                        text-xs
                        font-semibold
                        leading-5
                        text-violet-700
                      "
                    >
                      {bulkStatus}
                    </p>

                  </div>

                )}


                <Button
                  type="button"
                  className="
                    mt-4
                    h-12
                    w-full
                    gap-2
                    rounded-xl
                    bg-violet-600
                    font-extrabold
                    hover:bg-violet-700
                  "
                  onClick={
                    handleBulkGenerate
                  }
                  disabled={
                    !bulkFile ||
                    bulkProcessing
                  }
                >

                  {bulkProcessing ? (

                    <>
                      <Loader2
                        className="
                          h-4
                          w-4
                          animate-spin
                        "
                      />

                      Processing CSV...

                    </>

                  ) : (

                    <>
                      <FileSpreadsheet
                        className="
                          h-4
                          w-4
                        "
                      />

                      Generate Bulk Certificates

                    </>

                  )}

                </Button>

              </CardContent>

            </Card>

          </div>


          {/* ==================================================
              RIGHT PANEL
              ================================================== */}

          <div
            className="
              space-y-5
            "
          >


            {/* =================================================
                LIVE PREVIEW
                ================================================= */}

            <Card
              className="
                rounded-2xl
                border
                border-border/70
                bg-card
                shadow-sm
              "
            >

              <CardHeader
                className="
                  flex
                  flex-row
                  items-center
                  justify-between
                  gap-3
                  px-5
                  pb-3
                  pt-5
                "
              >

                <div>

                  <div
                    className="
                      flex
                      items-center
                      gap-2
                    "
                  >

                    <Award
                      className="
                        h-5
                        w-5
                        text-primary
                      "
                    />


                    <CardTitle
                      className="
                        text-base
                        font-black
                      "
                    >
                      Live Preview
                    </CardTitle>

                  </div>


                  <p
                    className="
                      mt-1
                      text-xs
                      font-medium
                      text-muted-foreground
                    "
                  >
                    Updates automatically
                    as you edit the form.
                  </p>

                </div>


                <Badge
                  className="
                    rounded-full
                    bg-emerald-50
                    text-[9px]
                    font-extrabold
                    uppercase
                    tracking-wide
                    text-emerald-700
                  "
                >

                  <CheckCircle2
                    className="
                      mr-1
                      h-3
                      w-3
                    "
                  />

                  Auto-Updating

                </Badge>

              </CardHeader>


              <CardContent
                className="
                  px-5
                  pb-6
                "
              >

                <CertificatePreview
                  data={
                    certificate
                  }
                  template={
                    selectedTemplate
                  }
                />


                <div
                  className="
                    mt-4
                    rounded-2xl
                    border
                    border-slate-200
                    bg-slate-50
                    p-4
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      gap-3
                    "
                  >

                    <div
                      className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-xl
                        bg-white
                        text-primary
                        shadow-sm
                      "
                    >

                      <QrCode
                        className="
                          h-4
                          w-4
                        "
                      />

                    </div>


                    <div
                      className="
                        min-w-0
                      "
                    >

                      <p
                        className="
                          text-xs
                          font-extrabold
                          text-slate-900
                        "
                      >
                        Verification ID
                      </p>


                      <p
                        className="
                          mt-1
                          truncate
                          text-[10px]
                          font-bold
                          text-primary
                        "
                      >
                        {certificateSummary
                          .recipient}
                        {" · "}
                        {certificate.id}
                      </p>

                    </div>

                  </div>

                </div>

              </CardContent>

            </Card>


            {/* =================================================
                CURRENT CONFIGURATION
                ================================================= */}

            <Card
              className="
                rounded-2xl
                border
                border-border/70
                bg-card
                shadow-sm
              "
            >

              <CardHeader
                className="
                  px-5
                  pb-3
                  pt-5
                "
              >

                <CardTitle
                  className="
                    text-base
                    font-black
                  "
                >
                  Current Configuration
                </CardTitle>

              </CardHeader>


              <CardContent
                className="
                  space-y-3
                  px-5
                  pb-6
                "
              >

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    gap-4
                    rounded-xl
                    bg-muted/40
                    px-4
                    py-3
                  "
                >

                  <span
                    className="
                      text-[10px]
                      font-extrabold
                      uppercase
                      tracking-[0.08em]
                      text-muted-foreground
                    "
                  >
                    Template
                  </span>


                  <span
                    className="
                      text-xs
                      font-black
                      text-foreground
                    "
                  >
                    {
                      certificateSummary
                        .template
                    }
                  </span>

                </div>


                <div
                  className="
                    flex
                    items-center
                    justify-between
                    gap-4
                    rounded-xl
                    bg-muted/40
                    px-4
                    py-3
                  "
                >

                  <span
                    className="
                      text-[10px]
                      font-extrabold
                      uppercase
                      tracking-[0.08em]
                      text-muted-foreground
                    "
                  >
                    Recipient
                  </span>


                  <span
                    className="
                      max-w-[60%]
                      truncate
                      text-xs
                      font-black
                      text-foreground
                    "
                  >
                    {
                      certificateSummary
                        .recipient
                    }
                  </span>

                </div>


                <div
                  className="
                    flex
                    items-center
                    justify-between
                    gap-4
                    rounded-xl
                    bg-muted/40
                    px-4
                    py-3
                  "
                >

                  <span
                    className="
                      text-[10px]
                      font-extrabold
                      uppercase
                      tracking-[0.08em]
                      text-muted-foreground
                    "
                  >
                    Event
                  </span>


                  <span
                    className="
                      max-w-[60%]
                      truncate
                      text-xs
                      font-black
                      text-foreground
                    "
                  >
                    {
                      certificateSummary
                        .event
                    }
                  </span>

                </div>


                <div
                  className="
                    flex
                    items-center
                    justify-between
                    gap-4
                    rounded-xl
                    bg-muted/40
                    px-4
                    py-3
                  "
                >

                  <span
                    className="
                      text-[10px]
                      font-extrabold
                      uppercase
                      tracking-[0.08em]
                      text-muted-foreground
                    "
                  >
                    Role
                  </span>


                  <span
                    className="
                      max-w-[60%]
                      truncate
                      text-xs
                      font-black
                      text-foreground
                    "
                  >
                    {
                      certificateSummary
                        .role
                    }
                  </span>

                </div>

              </CardContent>

            </Card>


            {/* =================================================
                SECURITY CARD
                ================================================= */}

            <div
              className="
                relative
                overflow-hidden
                rounded-2xl
                bg-gradient-to-br
                from-slate-950
                to-slate-800
                p-6
                text-white
                shadow-lg
              "
            >

              <div
                className="
                  pointer-events-none
                  absolute
                  -right-10
                  -top-10
                  h-36
                  w-36
                  rounded-full
                  bg-indigo-500/20
                  blur-3xl
                "
              />


              <div
                className="
                  relative
                  z-10
                "
              >

                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    bg-white/10
                    text-indigo-300
                  "
                >

                  <ShieldCheck
                    className="
                      h-5
                      w-5
                    "
                  />

                </div>


                <h3
                  className="
                    mt-5
                    text-lg
                    font-black
                  "
                >
                  Verified Credentials
                </h3>


                <p
                  className="
                    mt-2
                    text-xs
                    font-medium
                    leading-6
                    text-slate-300
                  "
                >
                  Each EventDevX certificate
                  includes a unique certificate
                  ID for future verification and
                  credential validation workflows.
                </p>


                <div
                  className="
                    mt-5
                    flex
                    items-center
                    gap-3
                  "
                >

                  <div
                    className="
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-lg
                      bg-emerald-500/10
                      text-emerald-300
                    "
                  >

                    <CheckCircle2
                      className="
                        h-4
                        w-4
                      "
                    />

                  </div>


                  <span
                    className="
                      text-[10px]
                      font-extrabold
                      uppercase
                      tracking-[0.1em]
                      text-slate-300
                    "
                  >
                    Certificate ID assigned
                  </span>

                </div>


                <div
                  className="
                    mt-3
                    flex
                    items-center
                    gap-3
                  "
                >

                  <div
                    className="
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-lg
                      bg-cyan-500/10
                      text-cyan-300
                    "
                  >

                    <QrCode
                      className="
                        h-4
                        w-4
                      "
                    />

                  </div>


                  <span
                    className="
                      text-[10px]
                      font-extrabold
                      uppercase
                      tracking-[0.1em]
                      text-slate-300
                    "
                  >
                    Verification block included
                  </span>

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* ====================================================
            FOOTER STATUS
            ==================================================== */}

        <section
          className="
            flex
            flex-col
            gap-3
            rounded-2xl
            border
            border-border/60
            bg-card
            px-5
            py-4
            shadow-sm
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >

          <div
            className="
              flex
              items-center
              gap-3
            "
          >

            <div
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                bg-emerald-100
                text-emerald-600
              "
            >

              <CheckCircle2
                className="
                  h-4
                  w-4
                "
              />

            </div>


            <div>

              <p
                className="
                  text-xs
                  font-bold
                  text-foreground
                "
              >
                Certificate Studio operational
              </p>


              <p
                className="
                  text-[10px]
                  font-medium
                  text-muted-foreground
                "
              >
                Generate and download certificates
                from the EventDevX dashboard.
              </p>

            </div>

          </div>


          <div
            className="
              flex
              items-center
              gap-2
              text-[10px]
              font-extrabold
              uppercase
              tracking-[0.08em]
              text-muted-foreground
            "
          >

            <Award
              className="
                h-3.5
                w-3.5
                text-primary
              "
            />

            EventDevX Credentials

          </div>

        </section>

      </div>

    </DashboardLayout>

  );

};


export default Certificates;