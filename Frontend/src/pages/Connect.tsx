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
          `Server returned non-JSON response. Content-Type: ${
            contentType || "none"
          }, Response: ${responseText.substring(0, 200)}${
            responseText.length > 200 ? "..." : ""
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

          {/* Features Grid */}
          <div className={Styles.featuresGrid}>
            <div className={`${Styles.featureCard} ${Styles.hoverGlow}`}>
              <div
                className={`${Styles.featureIconBox} ${Styles.glassDark} group-hover:glow-cyan`}
              >
                <Zap
                  className={`${Styles.featureIcon} ${Styles.cyanGlowText}`}
                />
              </div>
              <h3 className={Styles.featureTitle}>Instant Messaging</h3>
              <p className={Styles.featureText}>
                Send messages to any channel or user with lightning speed
                through our quantum-enhanced interface.
              </p>
            </div>

            <div className={`${Styles.featureCard} ${Styles.hoverGlow}`}>
              <div
                className={`${Styles.featureIconBox} ${Styles.glassDark} group-hover:glow-purple`}
              >
                <Clock
                  className={`${Styles.featureIcon} ${Styles.purpleGlowText}`}
                />
              </div>
              <h3 className={Styles.featureTitle}>Temporal Scheduling</h3>
              <p className={Styles.featureText}>
                Schedule messages across time zones with precision timing.
                Perfect for global team coordination.
              </p>
            </div>

            <div className={`${Styles.featureCard} ${Styles.hoverGlow}`}>
              <div
                className={`${Styles.featureIconBox} ${Styles.glassDark} group-hover:glow-cyan`}
              >
                <MessageSquare
                  className={`${Styles.featureIcon} ${Styles.cyanGlowText}`}
                />
              </div>
              <h3 className={Styles.featureTitle}>Neural Management</h3>
              <p className={Styles.featureText}>
                Advanced message management with AI-powered insights and full
                control over your communication flow.
              </p>
            </div>
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

              <div className={Styles.ctaFooter}>
                <div className={Styles.ctaFooterItem}>
                  <div className={`${Styles.dot} ${Styles.cyanGlow}`}></div>
                  Quantum Encrypted
                </div>
                <div className={Styles.ctaFooterItem}>
                  <div className={`${Styles.dot} ${Styles.purpleGlow}`}></div>
                  Zero Data Storage
                </div>
                <div className={Styles.ctaFooterItem}>
                  <div className={`${Styles.dot} ${Styles.cyanGlow}`}></div>
                  Instant Setup
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
