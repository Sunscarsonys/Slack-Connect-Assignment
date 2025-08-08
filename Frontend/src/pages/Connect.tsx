import { useState } from "react";
import {
  Slack,
  ArrowRight,
  Zap,
  Clock,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import Styles from "../styles/Connect.module.css";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

// Floating particles component
const FloatingParticles = () => {
  return (
    <div className={Styles.particles}>
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className={Styles.particle}
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 6}s`,
            animationDuration: `${6 + Math.random() * 4}s`,
          }}
        />
      ))}
    </div>
  );
};

export default function Connect() {
  const [connecting, setConnecting] = useState(false);

  const startOAuth = async () => {
    try {
      setConnecting(true);
      const res = await fetch(`${API_BASE}/auth/slack/authorize`, {
        credentials: "include",
      });
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to get URL: ${res.status} ${res.statusText}`);
      }

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const responseText = await res.text();
        throw new Error(
          `Server returned non-JSON response. Content-Type: ${contentType || "none"
          }, Response: ${responseText.substring(0, 200)}${responseText.length > 200 ? "..." : ""
          }`
        );
      }

      const { url } = await res.json();
      window.location.href = url;
    } catch (err) {
      console.error(err);
      alert("OAuth failed: " + err);
      setConnecting(false);
    }
  };

  return (
    <div className={Styles.pageContainer}>
      {/* Animated background grid */}
      <div className={Styles.gridBg}></div>

      {/* Floating particles */}
      <FloatingParticles />

      {/* Gradient overlays */}
      <div
        className={`${Styles.purpleGlow} ${Styles.gradientOverlayTop}`}
      ></div>
      <div
        className={`${Styles.cyanGlow} ${Styles.gradientOverlayBottom}`}
      ></div>

      <div className={Styles.contentContainer}>
        <div className={Styles.mainContent}>
          {/* Header */}
          <div className={Styles.header}>
            <div
              className={`${Styles.iconContainer} ${Styles.pulseGlow} ${Styles.hoverScale}`}
            >
              <Slack className={`${Styles.slackIcon} ${Styles.cyanGlowText}`} />
            </div>
            <h1 className={Styles.title}>
              Slack Message
              <span className={Styles.titleGradient}> Nexus</span>
            </h1>
            <p className={Styles.subtitle}>
              Connect your Slack workspace to the future of messaging. Send
              instant messages and schedule them with
              <span className={Styles.cyanGlowText}> quantum precision</span>.
            </p>
          </div>

          {/* CTA Section */}
          <div className={`${Styles.ctaSection} ${Styles.glass}`}>
            <div className={Styles.ctaGradientOverlay}></div>
            <div className={Styles.ctaContent}>
              <div className={Styles.ctaHeader}>
                <Sparkles
                  className={`${Styles.sparkleIcon} ${Styles.purpleGlowText}`}
                />
                <h2 className={Styles.ctaTitle}>Initialize Connection</h2>
                <Sparkles
                  className={`${Styles.sparkleIcon} ${Styles.cyanGlowText}`}
                />
              </div>
              <p className={Styles.ctaSubtitle}>
                Establish a secure quantum tunnel to your Slack workspace and
                unlock the future of messaging.
              </p>

              <button
                onClick={startOAuth}
                disabled={connecting}
                className={`${Styles.ctaButton} ${Styles.btnGlow} ${Styles.glowPurpleStrong}`}
              >
                {connecting ? (
                  <>
                    <div className={Styles.spinner}></div>
                    Establishing Connection...
                  </>
                ) : (
                  <>
                    <Slack className={Styles.slackButtonIcon} />
                    Connect Slack Workspace
                    <ArrowRight className={Styles.arrowIcon} />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
