FROM amazonlinux:2


ARG url
ARG entrypoint

RUN set -eux; \
    curl --silent --show-error --fail --location --retry 3 \
    --output ${entrypoint}.rpm \
    ${url}; \
    rpm -U ${entrypoint}.rpm;

RUN ${entrypoint} --version

ENTRYPOINT [ "${entrypoint}" ]
