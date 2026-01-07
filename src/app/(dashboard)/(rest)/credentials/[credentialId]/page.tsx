import React from "react";

interface PageProps {
  params: Promise<{ credentialId: string }>;
}

const CredentialId = async ({ params }: PageProps) => {
  const { credentialId } = await params;
  return <div>CredentialId {credentialId} </div>;
};

export default CredentialId;
