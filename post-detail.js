const posts = [
  {
    id: 1,
    title: "Understanding Entra ID Access Reviews",
    category: "Entra ID",
    featured: true,
    date: "2025-10-01",
    image: "./images/entra-id.png",
    content: {
      intro: "Access Reviews in Entra ID are an essential practice for maintaining least-privilege across your environment. Regular reviews help ensure that users, guests, and privileged roles don't retain access they no longer need.",
      sections: [
        {
          heading: "Why run Access Reviews?",
          type: "list",
          items: [
            "Reduce risk from stale or excessive permissions.",
            "Maintain compliance with internal and external requirements.",
            "Automate attestation processes and record decisions."
          ]
        },
        {
          heading: "Quick setup",
          type: "numbered-list",
          items: [
            "Open the Azure portal → Entra ID → Identity Governance → Access Reviews.",
            "Create a new review and choose the scope (users, groups, or applications).",
            "Define reviewers (self, managers, or specific people) and recurrence.",
            "Configure auto-apply decisions for users who don't respond if required."
          ]
        },
        {
          type: "image",
          src: "./images/entra-id.png",
          alt: "Entra ID Dashboard"
        },
        {
          heading: "Best practices",
          type: "paragraph",
          text: "Run reviews for privileged roles and guest accounts at least quarterly. Keep documentation for decisions and integrate with your identity lifecycle processes so removals trigger follow-up actions."
        }
      ]
    }
  },
  {
    id: 2,
    title: "Getting Started with Azure Resource Groups",
    category: "Azure",
    featured: true,
    date: "2025-10-05",
    image: "./images/azure-resource-group.png",
    content: {
      intro: "Azure Resource Groups are logical containers you use to group related Azure resources so they can be managed together. They simplify role-based access control, cost tracking, and lifecycle management.",
      sections: [
        {
          heading: "Core concepts",
          type: "paragraph",
          text: "Resources in a resource group share lifecycle and can be deployed, updated, and deleted as a unit. Use resource groups to scope RBAC, apply tags, and set policies."
        },
        {
          heading: "Basic workflow",
          type: "numbered-list",
          items: [
            "Create a resource group in the portal, CLI, or ARM/Bicep template.",
            "Deploy resources (VMs, storage, networks) into the group.",
            "Apply tags and policies to enforce naming, SKUs, and cost controls."
          ]
        },
        {
          type: "image",
          src: "./images/azure-resource-group.png",
          alt: "Azure Resource Group"
        },
        {
          heading: "Tips",
          type: "paragraph",
          text: "Group resources by application or environment (prod/stage/dev). Avoid placing unrelated resources in the same group just to reuse tags — prefer consistent tagging strategy."
        }
      ]
    }
  },
  {
    id: 3,
    title: "Defender for Endpoint – Tips for Configuration",
    category: "Defender",
    featured: false,
    date: "2025-09-25",
    image: "./images/defender.png",
    content: {
      intro: "Microsoft Defender for Endpoint provides prevention, detection, and response capabilities for endpoints. Proper configuration ensures you catch threats early while reducing noise.",
      sections: [
        {
          heading: "Quick configuration checklist",
          type: "list",
          items: [
            "Enable attack surface reduction rules for browsers and Office.",
            "Configure tamper protection to prevent local changes to security settings.",
            "Set up automatic investigation and remediation (AIR) to minimize manual work."
          ]
        },
        {
          type: "image",
          src: "./images/defender.png",
          alt: "Defender Dashboard"
        },
        {
          heading: "Integrations",
          type: "paragraph",
          text: "Integrate with Microsoft Sentinel or another SIEM for centralized alerting. Tune your EDR alert thresholds and create playbooks for high-confidence detections."
        }
      ]
    }
  },
  {
    id: 4,
    title: "PowerShell Script to Automate User Cleanup",
    category: "PowerShell",
    featured: false,
    date: "2025-10-07",
    image: "./images/powershell-script.png",
    content: {
      intro: "Cleaning up inactive or stale user accounts reduces security risk. A PowerShell script can identify accounts with no sign-ins and either report or disable them automatically.",
      sections: [
        {
          heading: "Example approach",
          type: "code",
          language: "powershell",
          code: `Get-MgUser -Filter "accountEnabled eq true" -All | Where-Object { 
  # sample filter: no sign-ins in 90 days (pseudo)
  $_.signInActivity.LastSignInDateTime -lt (Get-Date).AddDays(-90)
} | Select-Object DisplayName,UserPrincipalName`
        },
        {
          type: "paragraph",
          text: "Use caution: test in a small pilot, keep an audit log, and implement a staged disable before deletion."
        },
        {
          type: "image",
          src: "./images/powershell-script.png",
          alt: "PowerShell Script Example"
        }
      ]
    }
  },
  {
    id: 5,
    title: "Quick Wins with Entra ID Conditional Access",
    category: "Entra ID",
    featured: false,
    date: "2025-08-15",
    image: "./images/entra-conditional-quick.png",
    content: {
      intro: "Conditional Access is a high-impact control. Start with a couple of targeted rules that protect the highest-risk scenarios without disrupting users.",
      sections: [
        {
          heading: "Starter rules",
          type: "list",
          items: [
            "MFA for admin roles and privileged operations.",
            "Block legacy authentication by default and allow exceptions only when needed and logged.",
            "Require compliant or hybrid-joined devices for access to sensitive apps."
          ]
        },
        {
          type: "image",
          src: "./images/entra-conditional-quick.png",
          alt: "Conditional Access Quick Wins"
        },
        {
          type: "paragraph",
          text: "Monitor sign-in logs after enabling rules to catch unintended blocks and adjust conditions accordingly."
        }
      ]
    }
  },
  {
    id: 6,
    title: "Azure Cost Alerts and Budgets",
    category: "Azure",
    featured: false,
    date: "2025-08-10",
    image: "./images/azure-costs.png",
    content: {
      intro: "Costs can escalate quickly in the cloud. Use Azure Cost Management to create budgets, alerting, and chargeback reporting so teams stay accountable.",
      sections: [
        {
          heading: "How to get started",
          type: "numbered-list",
          items: [
            "Create a budget scoped to a subscription or resource group.",
            "Set alert thresholds (50%, 75%, 90%) and notify cost owners.",
            "Use tags to slice costs by application, team, or environment."
          ]
        },
        {
          type: "image",
          src: "./images/azure-costs.png",
          alt: "Azure Cost Alerts"
        },
        {
          type: "paragraph",
          text: "Consider automated actions for persistent overspend, such as shutting down non-production VMs outside business hours."
        }
      ]
    }
  },
  {
    id: 7,
    title: "Defender Response Playbooks: A Starter Guide",
    category: "Defender",
    featured: false,
    date: "2025-08-05",
    image: "./images/defender-playbook.png",
    content: {
      intro: "Playbooks automate investigation and containment steps so teams can respond to incidents consistently and quickly. Start small and expand capabilities over time.",
      sections: [
        {
          heading: "Starter playbook ideas",
          type: "list",
          items: [
            "Isolate compromised endpoints and collect forensic artifacts.",
            "Block known malicious IPs and domains via network controls.",
            "Notify incident response on high-severity alerts and create a ticket."
          ]
        },
        {
          type: "image",
          src: "./images/defender-playbook.png",
          alt: "Defender Playbook"
        },
        {
          type: "paragraph",
          text: "Test playbooks in a controlled environment and measure mean time to containment (MTTC) improvements."
        }
      ]
    },
  },
  {
    id: 8,
    title: "Privileged Identity Management Best Practices",
    category: "Entra ID",
    featured: true,
    date: "2025-09-30",
    image: "./images/entra-pim.png",
    content: {
      intro: "Privileged Identity Management (PIM) reduces standing access by enabling just-in-time privileges. When implemented well, it limits exposure and provides an audit trail for elevated access.",
      sections: [
        {
          heading: "Key controls",
          type: "list",
          items: [
            "Require approval for activation of high-level roles.",
            "Enforce multifactor authentication on activation.",
            "Set maximum activation durations and require justification."
          ]
        },
        {
          type: "image",
          src: "./images/entra-pim.png",
          alt: "Entra PIM"
        },
        {
          type: "paragraph",
          text: "Regularly review PIM assignments and leverage access reviews to keep privileged roles minimal."
        }
      ]
    },
  },
  {
    id: 9,
    title: "Azure Policy for Cost Control",
    category: "Azure",
    featured: false,
    date: "2025-09-28",
    image: "./images/azure-costs.png",
    content: {
      intro: "Azure Policy allows you to enforce guardrails. For cost control, policies can prevent expensive SKUs, require tags, and even deny non-compliant deployments.",
      sections: [
        {
          heading: "Examples",
          type: "list",
          items: [
            "Deny creation of high-cost VM SKUs in non-production subscriptions.",
            "Require a cost center tag on all resource creation.",
            "Audit and then enforce resource types that are allowed."
          ]
        },
        {
          type: "image",
          src: "./images/azure-costs.png",
          alt: "Azure Policy"
        },
        {
          type: "paragraph",
          text: "Start with audit mode to measure impact, then move to enforce when you're confident in the rules."
        }
      ]
    },
  },
  {
    id: 10,
    title: "Configuring EDR Alerts in Defender",
    category: "Defender",
    featured: false,
    date: "2025-09-20",
    image: "./images/defender-edr.png",
    content: {
      intro: "Endpoint Detection and Response (EDR) alerts are a cornerstone of an effective detection program. Well-tuned alerts reduce noise and surface high-fidelity incidents.",
      sections: [
        {
          heading: "Tuning recommendations",
          type: "list",
          items: [
            "Prioritize alerts by combining signals (process, network, file) to increase confidence.",
            "Use dynamic exclusion lists for known benign software in your environment.",
            "Integrate with ticketing and case management to track investigations."
          ]
        },
        {
          type: "image",
          src: "./images/defender-edr.png",
          alt: "Defender EDR"
        },
        {
          type: "paragraph",
          text: "Document playbooks for common EDR scenarios so responders have a consistent runbook to follow."
        }
      ]
    },
  },
  {
    id: 11,
    title: "PowerShell: Automating License Assignments",
    category: "PowerShell",
    featured: true,
    date: "2025-09-18",
    image: "./images/powershell-license.png",
    content: {
      intro: "Assigning licenses manually is slow and error-prone. PowerShell automation ensures users receive correct licenses at provisioning and makes bulk updates simple.",
      sections: [
        {
          heading: "Sample pattern",
          type: "code",
          language: "powershell",
          code: `# Pseudo-example using Microsoft Graph PowerShell
Connect-MgGraph -Scopes "User.ReadWrite.All","Directory.ReadWrite.All"
$user = Get-MgUser -UserId "newuser@contoso.com"
Add-MgUserLicense -UserId $user.Id -SkuId "ENTERPRISEPACK"`
        },
        {
          type: "image",
          src: "./images/powershell-license.png",
          alt: "PowerShell License Script"
        },
        {
          type: "paragraph",
          text: "Wrap automation in safe checks and logging. Use group-based licensing where possible to reduce script complexity."
        }
      ]
    },
  },
  {
    id: 12,
    title: "Conditional Access: Building Secure Policies",
    category: "Entra ID",
    featured: false,
    date: "2025-09-15",
    image: "./images/entra-conditional-quick.png",
    content: {
      intro: "Conditional Access forms a critical layer in identity protection. Combine signals like user risk, device compliance, and location to make access decisions.",
      sections: [
        {
          heading: "Design approach",
          type: "numbered-list",
          items: [
            "Inventory your high-value apps and sensitive data.",
            "Create targeted policies for admin and sensitive-app access first.",
            "Use report-only mode to validate before enforcing policies."
          ]
        },
        {
          type: "image",
          src: "./images/entra-conditional-quick.png",
          alt: "Conditional Access"
        },
        {
          type: "paragraph",
          text: "Document exceptions and provide an escalation path for blocked users to reduce business disruption."
        }
      ]
    },
  },
  {
    id: 13,
    title: "ARM vs Bicep: Modern IaC Choices",
    category: "Azure",
    featured: false,
    date: "2025-09-10",
    image: "./images/azure-bicep.png",
    content: {
      intro: "Bicep is a domain-specific language that simplifies creating ARM templates. It provides better readability, modularization, and tooling compared to raw JSON ARM templates.",
      sections: [
        {
          heading: "When to use Bicep",
          type: "list",
          items: [
            "When you want concise and maintainable IaC files.",
            "If you plan to reuse modules across multiple deployments."
          ]
        },
        {
          type: "image",
          src: "./images/azure-bicep.png",
          alt: "Azure Bicep"
        },
        {
          type: "paragraph",
          text: "Migrate incrementally: compile Bicep to ARM and test in CI/CD before switching deployment pipelines."
        }
      ]
    },
  },
  {
    id: 14,
    title: "Threat Analytics: Interpreting Signals",
    category: "Defender",
    featured: false,
    date: "2025-09-05",
    image: "./images/defender-analytics.png",
    content: {
      intro: "Threat analytics combines telemetry to provide prioritized insights. Understanding signal composition helps you triage and prioritize investigations effectively.",
      sections: [
        {
          heading: "Key elements to review",
          type: "list",
          items: [
            "Severity and confidence scores.",
            "Entities involved (users, devices, IPs).",
            "Recommended actions and remediation steps."
          ]
        },
        {
          type: "image",
          src: "./images/defender-analytics.png",
          alt: "Defender Analytics"
        },
        {
          type: "paragraph",
          text: "Use analytics to drive automated responses for low-to-medium confidence alerts and reserve manual intervention for high-severity incidents."
        }
      ]
    },
  },
  {
    id: 15,
    title: "Using Graph API with PowerShell",
    category: "PowerShell",
    featured: false,
    date: "2025-09-02",
    image: "./images/powershell-graph.png",
    content: {
      intro: "The Microsoft Graph API is the unified endpoint for accessing Microsoft 365 and Entra data. PowerShell modules make it straightforward to authenticate and call Graph endpoints for automation.",
      sections: [
        {
          heading: "Common use cases",
          type: "list",
          items: [
            "User lifecycle automation (create, update, remove).",
            "Reporting on sign-ins and audit logs.",
            "Managing groups and membership at scale."
          ]
        },
        {
          type: "image",
          src: "./images/powershell-graph.png",
          alt: "PowerShell Graph"
        },
        {
          type: "paragraph",
          text: "Prefer delegated or application permissions based on your scenario and follow the principle of least privilege when granting Graph scopes."
        }
      ]
    },
  },
  {
    id: 16,
    title: "Storage Tiers and Cost Optimizations",
    category: "Azure",
    featured: false,
    date: "2025-08-28",
    image: "./images/azure-storage.png",
    content: {
      intro: "Choosing the right storage tier reduces costs while meeting performance needs. Hot storage is for frequent access, cool for infrequent, and archive for long-term retention.",
      sections: [
        {
          heading: "Practical steps",
          type: "numbered-list",
          items: [
            "Analyze access patterns with metrics and logs.",
            "Apply lifecycle management rules to transition blobs to cooler tiers.",
            "Use access tiers per-container where supported to isolate workloads."
          ]
        },
        {
          type: "image",
          src: "./images/azure-storage.png",
          alt: "Azure Storage"
        },
        {
          type: "paragraph",
          text: "Remember retrieval costs for archive tier — use it for true cold data only and test restore procedures regularly."
        }
      ]
    },
  },
  {
    id: 17,
    title: "Group-Based Licensing Strategies",
    category: "Entra ID",
    featured: false,
    date: "2025-08-20",
    image: "./images/entra-groups.png",
    content: {
      intro: "Group-based licensing makes license management scalable. Dynamic groups can automatically add users based on attributes and reduce the need for manual assignment.",
      sections: [
        {
          heading: "Strategy tips",
          type: "list",
          items: [
            "Define groups by job role, location, or business unit for predictable licensing.",
            "Use dynamic membership where possible and monitor group membership changes.",
            "Audit license usage and reconcile against entitlement to avoid waste."
          ]
        },
        {
          type: "image",
          src: "./images/entra-groups.png",
          alt: "Entra Groups"
        },
        {
          type: "paragraph",
          text: "Combine group-based licensing with reporting to track adoption and costs over time."
        }
      ]
    },
  },

];

// HTML Content Generator
function generatePostHTML(postContent) {
  if (typeof postContent === 'string') {
    // Legacy HTML content - return as is
    return postContent;
  }

  if (!postContent || !postContent.sections) {
    return '<p>No content available.</p>';
  }

  let html = '';

  // Add intro paragraph if exists
  if (postContent.intro) {
    html += `<p>${postContent.intro}</p>\n\n`;
  }

  // Process each section
  postContent.sections.forEach(section => {
    switch (section.type) {
      case 'paragraph':
        if (section.heading) {
          html += `<h2>${section.heading}</h2>\n`;
        }
        if (section.text) {
          html += `<p>${section.text}</p>\n\n`;
        }
        break;

      case 'list':
        if (section.heading) {
          html += `<h2>${section.heading}</h2>\n`;
        }
        if (section.items && section.items.length > 0) {
          html += '<ul>\n';
          section.items.forEach(item => {
            html += `  <li>${item}</li>\n`;
          });
          html += '</ul>\n\n';
        }
        break;

      case 'numbered-list':
        if (section.heading) {
          html += `<h2>${section.heading}</h2>\n`;
        }
        if (section.items && section.items.length > 0) {
          html += '<ol>\n';
          section.items.forEach(item => {
            html += `  <li>${item}</li>\n`;
          });
          html += '</ol>\n\n';
        }
        break;

      case 'code':
        if (section.heading) {
          html += `<h2>${section.heading}</h2>\n`;
        }
        if (section.code) {
          const language = section.language || '';
          html += `<pre><code class="${language}">${section.code}</code></pre>\n\n`;
        }
        break;

      case 'image':
        if (section.src) {
          html += `<img src="${section.src}" alt="${section.alt || ''}" />\n\n`;
        }
        break;

      default:
        console.warn('Unknown section type:', section.type);
        break;
    }
  });

  return html.trim();
}

// Helper function to get post content as HTML
function getPostHTML(post) {
  return generatePostHTML(post.content);
}

// Helper function to get clean text content for TTS
function getPostTextContent(post) {
  if (typeof post.content === 'string') {
    // Legacy HTML content - extract text
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = post.content;
    return tempDiv.textContent || tempDiv.innerText || '';
  }

  let textContent = '';

  // Add intro
  if (post.content.intro) {
    textContent += post.content.intro + '. ';
  }

  // Process sections
  if (post.content.sections) {
    post.content.sections.forEach(section => {
      if (section.heading) {
        textContent += section.heading + '. ';
      }

      switch (section.type) {
        case 'paragraph':
          if (section.text) {
            textContent += section.text + '. ';
          }
          break;

        case 'list':
        case 'numbered-list':
          if (section.items) {
            section.items.forEach(item => {
              textContent += item + '. ';
            });
          }
          break;

        case 'code':
          if (section.code) {
            textContent += 'Code example: ' + section.code.replace(/\s+/g, ' ') + '. ';
          }
          break;

        // Skip images for text content
        case 'image':
          break;
      }
    });
  }

  return textContent.trim();
}

// Text-to-Speech Functionality
class TextToSpeech {
  constructor() {
    this.synth = window.speechSynthesis;
    this.isSupported = 'speechSynthesis' in window;
    this.isPlaying = false;
    this.isPaused = false;
    this.currentUtterance = null;
    this.currentButton = null;
  }

  // Check if TTS is supported
  isTextToSpeechSupported() {
    return this.isSupported;
  }

  // Get available voices
  getVoices() {
    return this.synth.getVoices();
  }

  // Create and add TTS button to post content
  addTTSButton(postElement, postContent, postTitle) {
    // Check if TTS is supported
    if (!this.isTextToSpeechSupported()) {
      console.warn('Text-to-Speech is not supported in this browser');
      return null;
    }

    // Find the title element (h1)
    const titleElement = postElement.querySelector('h1');
    if (!titleElement) {
      console.warn('Could not find title element to place TTS button');
      return null;
    }

    // Create TTS button (smaller version for beside title)
    const ttsButton = document.createElement('button');
    ttsButton.className = 'tts-button tts-button-compact';
    ttsButton.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.08"></path>
      </svg>
      <span class="tts-text">Listen</span>
    `;
    ttsButton.setAttribute('aria-label', 'Read post aloud');
    ttsButton.setAttribute('title', 'Click to listen to this post');

    // Create a container for title and button
    const titleContainer = document.createElement('div');
    titleContainer.className = 'post-title-container';
    
    // Move the title into the container
    titleElement.parentNode.insertBefore(titleContainer, titleElement);
    titleContainer.appendChild(titleElement);
    titleContainer.appendChild(ttsButton);

    // Add event listener
    ttsButton.addEventListener('click', () => {
      this.handleTTSClick(ttsButton, postContent, postTitle);
    });

    return ttsButton;
  }

  // Handle TTS button click
  handleTTSClick(button, content, title) {
    if (this.isPlaying && this.currentButton === button) {
      if (this.isPaused) {
        this.resumeSpeech(button);
      } else {
        this.pauseSpeech(button);
      }
    } else {
      this.startSpeech(button, content, title);
    }
  }

  // Start speech
  startSpeech(button, content, title) {
    // Check if TTS is supported
    if (!this.isTextToSpeechSupported()) {
      alert('Text-to-Speech is not supported in your browser. Please try Chrome, Safari, or Edge.');
      return;
    }

    // Stop any current speech
    this.stopSpeech();

    // Prepare text content
    const textContent = this.extractTextContent(content, title);
    
    if (!textContent.trim()) {
      alert('No text content found to read.');
      return;
    }

    // Create utterance
    this.currentUtterance = new SpeechSynthesisUtterance(textContent);
    this.currentButton = button;

    // Configure utterance
    this.currentUtterance.rate = 0.9;
    this.currentUtterance.pitch = 1;
    this.currentUtterance.volume = 1;

    // Set voice (prefer English voices)
    const voices = this.getVoices();
    const englishVoice = voices.find(voice => 
      voice.lang.startsWith('en') && 
      (voice.name.includes('Google') || voice.name.includes('Microsoft') || voice.name.includes('Natural'))
    ) || voices.find(voice => voice.lang.startsWith('en')) || voices[0];
    
    if (englishVoice) {
      this.currentUtterance.voice = englishVoice;
    }

    // Event listeners
    this.currentUtterance.onstart = () => {
      this.isPlaying = true;
      this.isPaused = false;
      this.updateButtonState(button, 'playing');
    };

    this.currentUtterance.onend = () => {
      this.isPlaying = false;
      this.isPaused = false;
      this.updateButtonState(button, 'stopped');
      this.currentButton = null;
    };

    this.currentUtterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      this.isPlaying = false;
      this.isPaused = false;
      this.updateButtonState(button, 'stopped');
      this.currentButton = null;
    };

    // Start speaking
    this.synth.speak(this.currentUtterance);
  }

  // Pause speech
  pauseSpeech(button) {
    if (this.synth.speaking && !this.synth.paused) {
      this.synth.pause();
      this.isPaused = true;
      this.updateButtonState(button, 'paused');
    }
  }

  // Resume speech
  resumeSpeech(button) {
    if (this.synth.paused) {
      this.synth.resume();
      this.isPaused = false;
      this.updateButtonState(button, 'playing');
    }
  }

  // Stop speech
  stopSpeech() {
    if (this.synth.speaking) {
      this.synth.cancel();
    }
    this.isPlaying = false;
    this.isPaused = false;
    if (this.currentButton) {
      this.updateButtonState(this.currentButton, 'stopped');
    }
    this.currentButton = null;
  }

  // Update button appearance based on state
  updateButtonState(button, state) {
    const textElement = button.querySelector('.tts-text');

    button.classList.remove('playing', 'paused', 'stopped');
    
    switch (state) {
      case 'playing':
        button.classList.add('playing');
        textElement.textContent = 'Pause';
        button.setAttribute('aria-label', 'Pause reading');
        break;
      case 'paused':
        button.classList.add('paused');
        textElement.textContent = 'Resume';
        button.setAttribute('aria-label', 'Resume reading');
        break;
      case 'stopped':
      default:
        button.classList.add('stopped');
        textElement.textContent = 'Listen';
        button.setAttribute('aria-label', 'Read post aloud');
        break;
    }
  }

  // Extract clean text content from HTML
  extractTextContent(htmlContent, title) {
    // Create a temporary div to parse HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;

    // Remove script and style elements
    const scripts = tempDiv.querySelectorAll('script, style');
    scripts.forEach(el => el.remove());

    // Get text content
    let textContent = tempDiv.textContent || tempDiv.innerText || '';

    // Clean up the text
    textContent = textContent
      .replace(/\s+/g, ' ') // Replace multiple whitespace with single space
      .replace(/\n+/g, '. ') // Replace newlines with periods
      .trim();

    // Add title at the beginning
    if (title) {
      textContent = `${title}. ${textContent}`;
    }

    return textContent;
  }
}

// Initialize TTS when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Wait for voices to load
  const initTTS = () => {
    window.ttsInstance = new TextToSpeech();
  };

  // Some browsers need to wait for voices to load
  if (speechSynthesis.getVoices().length !== 0) {
    initTTS();
  } else {
    speechSynthesis.addEventListener('voiceschanged', initTTS, { once: true });
  }
});

// Stop speech when page unloads
window.addEventListener('beforeunload', function() {
  if (window.ttsInstance) {
    window.ttsInstance.stopSpeech();
  }
});
