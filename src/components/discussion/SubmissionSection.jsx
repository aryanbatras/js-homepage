import React, { useState } from "react";
import {
  FaUser,
  FaArrowUp,
  FaArrowDown,
  FaCode,
  FaPlus,
  FaExclamationTriangle,
} from "react-icons/fa";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import Editor from "@monaco-editor/react";
import { useDiscussion } from "../../hooks/useDiscussion";
import styles from "./SubmissionSection.module.sass";

export default function SubmissionSection({ problemId }) {
  const {
    submissions,
    addSubmission,
    upvoteSubmission,
    downvoteSubmission,
    canComment,
    loading,
    user,
  } = useDiscussion(problemId);
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);
  const [formData, setFormData] = useState({
    approach: "",
    code: "",
    description: "",
  });

  const validateCodeBeforeSubmit = () => {
    try {
      // JavaScript syntax validation using Function constructor
      new Function(formData.code);
      return { valid: true, errors: [] };
    } catch (error) {
      return {
        valid: false,
        errors: [error.message],
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.approach.trim() || !formData.code.trim()) return;

    // Validate code before submission
    const validation = validateCodeBeforeSubmit();
    if (!validation.valid) {
      setValidationErrors(validation.errors);
      return;
    }

    setValidationErrors([]);
    setSubmitting(true);
    try {
      await addSubmission(
        formData.approach,
        formData.code,
        formData.description,
      );
      setFormData({ approach: "", code: "", description: "" });
      setShowSubmitForm(false);
    } catch (error) {
      if (error.message.includes("login")) {
        alert("Please login with GitHub to submit solutions");
      } else if (error.message.includes("validation failed")) {
        setValidationErrors([
          error.message.replace("Code validation failed: ", ""),
        ]);
      } else {
        alert(error.message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpvote = async (submissionId) => {
    try {
      await upvoteSubmission(submissionId);
    } catch (error) {
      console.error("Error upvoting:", error);
    }
  };

  const handleDownvote = async (submissionId) => {
    try {
      await downvoteSubmission(submissionId);
    } catch (error) {
      console.error("Error downvoting:", error);
    }
  };

  const hasUserUpvoted = (submission) => {
    return submission.upvoters?.includes(user?.id);
  };

  const hasUserDownvoted = (submission) => {
    return submission.downvoters?.includes(user?.id);
  };

  if (loading) {
    return <div className={styles.loading}>Loading submissions...</div>;
  }

  return (
    <div className={styles.container}>
      <h3>Community Solutions ({submissions.length})</h3>

      {canComment && (
        <div className={styles.submitSection}>
          {!showSubmitForm ? (
            <button
              onClick={() => setShowSubmitForm(true)}
              className={styles.submitButton}
            >
              <FaPlus />
              <span>Submit Your Solution</span>
            </button>
          ) : (
            <form onSubmit={handleSubmit} className={styles.submitForm}>
              <div className={styles.formGroup}>
                <label>Approach Title</label>
                <input
                  type="text"
                  value={formData.approach}
                  onChange={(e) =>
                    setFormData({ ...formData, approach: e.target.value })
                  }
                  placeholder="e.g., Recursive Approach with Memoization"
                  className={styles.textInput}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Explain your approach and why it works..."
                  className={styles.textarea}
                  rows={3}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Code Solution</label>
                <div className={styles.editorContainer}>
                  <Editor
                    height="300px"
                    language="javascript"
                    value={formData.code}
                    onChange={(value) =>
                      setFormData({ ...formData, code: value || "" })
                    }
                    theme="vs-dark"
                    options={{
                      minimap: { enabled: false },
                      fontSize: 14,
                      lineNumbers: "on",
                      scrollBeyondLastLine: false,
                      wordWrap: "on",
                      automaticLayout: true,
                      tabSize: 2,
                      insertSpaces: true,
                    }}
                  />
                </div>
              </div>

              <div className={styles.formActions}>
                {validationErrors.length > 0 && (
                  <div className={styles.validationErrors}>
                    <FaExclamationTriangle />
                    <div>
                      <p>Please fix the following errors before submitting:</p>
                      <ul>
                        {validationErrors.map((error, index) => (
                          <li key={index}>{error}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
                <div className={styles.buttonGroup}>
                  <button
                    type="submit"
                    disabled={
                      submitting ||
                      !formData.approach.trim() ||
                      !formData.code.trim()
                    }
                    className={styles.primaryButton}
                  >
                    {submitting ? "Submitting..." : "Submit Solution"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowSubmitForm(false);
                      setValidationErrors([]);
                    }}
                    className={styles.secondaryButton}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      )}

      <div className={styles.submissionsList}>
        {submissions.map((submission) => (
          <div key={submission.id} className={styles.submission}>
            <div className={styles.submissionHeader}>
              <div className={styles.userInfo}>
                {submission.avatar ? (
                  <img
                    src={submission.avatar}
                    alt={submission.username}
                    className={styles.avatar}
                  />
                ) : (
                  <div className={styles.avatarPlaceholder}>
                    <FaUser />
                  </div>
                )}
                <div>
                  <span className={styles.username}>{submission.username}</span>
                  <span className={styles.timestamp}>
                    {submission.timestamp?.toDate()?.toLocaleString() ||
                      "Just now"}
                  </span>
                </div>
              </div>
              <div className={styles.voting}>
                <button
                  onClick={() => handleUpvote(submission.id)}
                  className={`${styles.voteButton} ${hasUserUpvoted(submission) ? styles.upvoted : ""}`}
                >
                  <FaArrowUp />
                  <span>{submission.upvotes || 0}</span>
                </button>
                <button
                  onClick={() => handleDownvote(submission.id)}
                  className={`${styles.voteButton} ${hasUserDownvoted(submission) ? styles.downvoted : ""}`}
                >
                  <FaArrowDown />
                  <span>{submission.downvotes || 0}</span>
                </button>
              </div>
            </div>

            <div className={styles.submissionContent}>
              <h4>{submission.approach}</h4>
              {submission.description && (
                <p className={styles.description}>{submission.description}</p>
              )}

              <div className={styles.codeContainer}>
                <div className={styles.codeHeader}>
                  <FaCode />
                  <span>JavaScript</span>
                </div>
                <SyntaxHighlighter
                  language="javascript"
                  style={vscDarkPlus}
                  customStyle={{
                    margin: 0,
                    fontSize: "0.875rem",
                    lineHeight: "1.6",
                  }}
                  showLineNumbers
                  wrapLines
                >
                  {submission.code}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>
        ))}

        {submissions.length === 0 && (
          <>
            {!canComment ? (
              <div className={styles.noSubmissions}>
                <p>Login to share your approach!</p>
              </div>
            ) : (
              <div className={styles.noSubmissions}>
                <p>
                  No solutions submitted yet. Be the first to share your
                  approach!
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
